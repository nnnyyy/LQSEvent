/**
 * Created by nnnyyy on 2018-11-22.
 */
'use strict'
const http = require('http');
const socketio = require('socket.io');
const sharedsession = require("express-socket.io-session");
const Promise = require('promise');
const P = require('../../common/protocol');
const DBHelper = require('./DBHelper');
const User = require('./User');
const AutoQuizMan = require('./AutoQuizManager');

const routes = require('../router/index');
const routesAuth = require('../router/auth');

class ServerManager {
    constructor(app) {

        app.use((req, res, next) => {
            req.sm = this;
            next();
        } );
        app.use('/', routes );
        app.use('/auth/', routesAuth);

        console.log('ServerManager Init');
        this.http = http.Server(app);
        this.io = socketio(this.http, {
            origins: '*:*',
            pingInterval: 5000,
            pingTimeout: 10000,
            transports: ['websocket','polling']
        });
        this.io.use(sharedsession(app.session, {autoSave: true}));
        this.mUsers = new Map();
        this.aDisconnect = [];
        this.init();
    }

    init() {
        const sm = this;
        new Promise(function(resolve, reject) {
            AutoQuizMan.init( sm );
            resolve();
        })
        .then(function() {
                return new Promise(function( resolve, reject) {
                    sm.updateIntervalID = setInterval(function(){ sm.update(); }, 300);
                    resolve();
                });
            })
        .then(function() {
                sm.listen();
        });
    }

    listen() {
        const sm = this;
        this.http.listen(3000, function() {
            console.log('Server listening on *:3000');
        });

        this.io.on('connection', function(socket) {
            sm.connectUser(socket);
        });
    }

    update() {
        const sm = this;
        const tCur = new Date();
        try {
            sm.aDisconnect = [];

            this.mUsers.forEach(function(item, id) {
                const user = item;
                if( !item.socket.connected ) {
                    if( tCur - item.tLogout >= 10 * 1000 ) {
                        sm.aDisconnect.push(id);
                    }
                }
                else {
                    if( user.saveFlag & User.getSaveFlag().SFLAG_MAX_COMBO) {
                        user.saveFlag &= ~User.getSaveFlag().SFLAG_MAX_COMBO;
                        DBHelper.saveMaxCombo( id, user.maxCombo, function(result) {
                        });
                    }
                }
            });

            //  실제 Delete 처리
            for( let idx in sm.aDisconnect ) {
                const id = sm.aDisconnect[idx];
                const user = sm.getUser(id);
                sm.logout(user.socket, user.id);
            }

            //  자동 퀴즈 매니저
            AutoQuizMan.update( tCur );

        }catch(e) {
            console.log(e);
        }
    }

    sendPacket( socket, protocol, data ) {
        socket.emit(protocol, data);
    }

    broadcastPacket( protocol, data ) {
        this.io.sockets.in('auth').emit( protocol, data );
    }

    broadcastAllPacket( protocol, data ) {
        this.io.sockets.emit( protocol, data );
    }

    setPreListener( socket ) {
        const sm = this;
        socket.on(P.SOCK.LoginRequest, function(packet) { sm.onLoginRequest(socket, packet); });
        socket.on(P.SOCK.Disconnect, function() { sm.onDisconnect(socket); });
        socket.on(P.SOCK.QuizAnswer, function(packet) { sm.onQuizAnswer(socket, packet); });
        socket.on(P.SOCK.Logout, function(packet) { sm.onLogout(socket, packet); });
    }

    setPostListener( socket ) {
        const sm = this;
    }

    login( id, pw, ip, cb ) {
        this.pm_loginRequest(id, pw, ip)
        .then(this.pm_getUserInfo)
        .then(data => {
            cb({ret: 0, userinfo: data.userinfo});                        
        }).catch(err=> {
            cb({ret: -1});
        });
    }

    pm_loginRequest(id, pw, ip) {
        let data = {     
            ret: 0       
        };
        return new Promise((res,rej)=> {
            DBHelper.login(id, pw, ip, result => {
                if( result.ret !== 0 ) {
                    rej();
                    return;
                }

                const userinfo = {
                    id: result.id,
                    nick: result.nick,
                    level: result.auth,
                    adminLevel: result.adminMemberVal,
                    point: 0
                };

                data.userinfo = userinfo;                
                res(data);
            });
        });
    }

    pm_getUserInfo(data) {
        return new Promise( (res, rej) => {
            DBHelper.getUserInfo(data.userinfo.id, result => {
                if( result.ret !== 0 ) {
                    rej();
                    return;
                }

                data.userinfo.oxwincnt = result.info.oxwincnt;
                data.userinfo.banCnt = result.info.bancnt;
                data.userinfo.point = result.info.ap;
                
                res(data);
            })
        });
    }

    pm_getQuizInfo(data) {
        data.userinfo.maxCombo = 0;
        return new Promise((resolve, reject) => {
            DBHelper.getQuizInfo(data.userinfo.id, result => {
                if( result.ret != 0 ) {
                    reject();
                    return;
                }

                data.userinfo.maxCombo = result.maxCombo;
                resolve(data);
            });
        });
    }

    onDisconnect(sock) {
        const sm = this;
        try {
            const userdata = sock.handshake.session.userdata;
            if( !userdata ) {
                //  있을 수가 없어
                return;
            }

            const user = sm.mUsers.get(userdata.id);
            user.tLogout = new Date();

        }catch(e) {

        }
    }

    onQuizAnswer(sock, packet) {
        const sm = this;
        try {
            const userdata = sock.handshake.session.userdata;
            if( !userdata ) {
                //  있을 수가 없어
                return;
            }

            const user = sm.mUsers.get(userdata.id);
            AutoQuizMan.onQuizAnswer(user.id, packet.answer);

        }catch(e) {
            console.log(e);
        }
    }

    onLogout(socket, packet) {
        const sm = this;
        try {
            const userdata = socket.handshake.session.userdata;
            if( !userdata ) {
                //  있을 수가 없어
                sm.sendPacket(socket, P.SOCK.NotLogined, { ret: 0});
                return;
            }

            socket.leave('auth');

            sm.logout( socket, userdata.id );
            sm.sendPacket(socket, P.SOCK.NotLogined, { ret: 0});
        }catch(e) {
            console.log(e);
        }
    }
    
    logout( socket, id ) {
        const sm = this;
        const user = this.mUsers.get(id);
        if( !user ) {
            return;
        }

        new Promise(function(resolve, reject) {
            if( user.saveFlag & User.getSaveFlag().SFLAG_INC_POINT) {
                DBHelper.incPoint( id, user.incPoint, function(result) {
                    resolve();
                });
            }
            else {
                resolve();
            }
        })
        .then(function() {
            return new Promise(function(resolve, reject) {
                if( user.saveFlag & User.getSaveFlag().SFLAG_MAX_COMBO) {
                    DBHelper.saveMaxCombo( id, user.maxCombo, function(result) {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            })
        })
        .then(function() {
            user.saveFlag = 0;
            sm.mUsers.delete( id );
            if(deleteSession) {
                delete socket.handshake.session.userdata;
                socket.handshake.session.save();
            }
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    //  유저가 접속합니다.
    connectUser(socket) {        
        const userdata = socket.handshake.session.userdata;

        this.setPreListener(socket);

        this.broadcastAllPacket( P.SOCK.QuizRecordRank, {list: AutoQuizMan.quizRecordRankList});

        if( !userdata ) {
            this.sendPacket(socket, P.SOCK.NotLogined);
            return;
        }

        if( this.checkReconnect(userdata.id) ) {
            this.setReconnect(socket, userdata.id);
        }
        else {
            const userdata = socket.handshake.session.userdata;
            let ret = {
                id: userdata.id,
                nick: userdata.nick,
                auth: userdata.level,
                adminLevel: userdata.adminLevel,
                point: userdata.point,
                servName: this.serv_name,
                maxCombo: userdata.maxCombo
            }            

            let ip = socket.handshake.address.substr(7);
            if( socket.handshake.headers['x-real-ip'] != null ) {
                ip = socket.handshake.headers['x-real-ip'];
            }

            socket.join('auth');            

            let newUser = new User(this, socket);
            newUser.ip = ip;
            newUser.id = ret.id;
            newUser.nick = ret.nick;
            newUser.level = ret.auth;
            newUser.adminLevel = ret.adminLevel;
            newUser.point = ret.point;
            newUser.banCnt = userdata.banCnt;
            newUser.oxWinCnt = userdata.oxwincnt;
            newUser.maxCombo = ret.maxCombo;
            this.mUsers.set(ret.id, newUser);

            if( AutoQuizMan.isQuizRunning() ) {
                this.sendPacket(socket, P.SOCK.QuizData, AutoQuizMan.getCurQuizData());
            }
        }
    }

    checkReconnect(id) {
        const sm = this;
        const client = sm.mUsers.get(id);

        if( !client ) {
            return false;
        }
        else {
            return true;
        }

    }

    setReconnect(socket, id) {
        socket.join('auth');

        const user = this.mUsers.get(id);
        user.socket = socket;
        user.tLogout = 0;
        
        this.sendPacket(socket, P.SOCK.ComboInfo, {cnt: user.quizCombo, point: user.point});

        if( AutoQuizMan.isQuizRunning() ) {
            this.sendPacket(socket, P.SOCK.QuizData, AutoQuizMan.getCurQuizData());
        }
    }

    getUser( id ) {
        return this.mUsers.get( id );
    }
}

module.exports = ServerManager;