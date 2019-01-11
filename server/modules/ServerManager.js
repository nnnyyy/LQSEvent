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

    onLoginRequest( socket, packet ) {
        try {
            let ip = socket.handshake.address.substr(7);
            if( socket.handshake.headers['x-real-ip'] != null ) {
                ip = socket.handshake.headers['x-real-ip'];
            }

            const sm = this;



            this.login(socket, packet.id, packet.pw, ip)
            .then(this.loadPoint)
            .then(this.loadQuizInfo)
            .then(this.createUser)
            .then(function(ret) {
                sm.sendPacket(socket, P.SOCK.LoginRequest, ret.result);

                if( AutoQuizMan.isQuizRunning() ) {
                    sm.sendPacket(socket, P.SOCK.QuizData, AutoQuizMan.getCurQuizData());
                }
            })
            .catch(function(err) {
                    console.log(err);
            });
        }catch(e) {

        }
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

    login( socket, id, pw, ip ) {
        let ret = { sock: socket };
        const sm = this;
        return new Promise(function(resolve, reject) {
            DBHelper.login( id, pw, ip, function(result) {
                ret.id = id;
                ret.sm = sm;
                ret.result = result;
                resolve(ret);
            });
        });
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
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    loadPoint( ret ) {
        return new Promise(function(resolve, reject) {
            DBHelper.getActivePoint(ret.id, function(result) {
                if( result.ret != 0 ) {
                    reject();
                    return;
                }

                ret.result.point = result.point;
                resolve(ret);
            });
        });
    }

    loadQuizInfo( ret ) {
        ret.result.maxCombo = 0;
        return new Promise(function(resolve, reject) {
            DBHelper.getQuizInfo(ret.id, function(result) {
                if( result.ret != 0 ) {
                    reject();
                    return;
                }

                ret.result.maxCombo = result.maxCombo;
                resolve(ret);
            });
        });
    }

    createUser( ret ) {
        const sm = ret.sm;
        const socket = ret.sock;
        socket.handshake.session.userdata = { id: ret.id };
        socket.handshake.session.save();

        socket.join('auth');

        return new Promise(function(resolve, reject) {
            let newUser = new User(socket);
            newUser.id = ret.id;
            newUser.nick = ret.result.nick;
            newUser.level = ret.result.auth;
            newUser.adminLevel = ret.result.adminMemberVal;
            newUser.point = ret.result.point;
            newUser.maxCombo = ret.result.maxCombo;
            sm.mUsers.set(ret.id, newUser);
            resolve(ret);
        });
    }

    //  유저가 접속합니다.
    connectUser(socket) {
        const userdata = socket.handshake.session.userdata;

        this.setPreListener(socket);

        this.broadcastAllPacket( P.SOCK.QuizRecordRank, {list: AutoQuizMan.quizRecordRankList});

        if( !userdata ) {
            this.sendPacket(socket, P.SOCK.NotLogined, { ret: 0});
            return;
        }

        const user = this.mUsers.get( userdata.id );

        if( user && user.socket.id != socket.id && user.socket.connected ) {
            //   중복 접속
            this.sendPacket(socket, P.SOCK.NotLogined, {ret: -2});
            return;
        }

        if( this.checkReconnect(userdata.id) ) {
            this.setReconnect(socket, userdata.id);
        }
        else {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
            this.sendPacket(socket, P.SOCK.NotLogined, {});
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



        this.sendPacket(socket, P.SOCK.LoginRequest, { ret:0, id: id, nick: user.nick, auth: user.level, adminMemberVal: user.adminLevel, point: user.point });
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