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

class ServerManager {
    constructor(app) {
        console.log('ServerManager Init');
        this.http = http.Server(app);
        this.io = socketio(this.http);
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
                if( !item.socket.connected ) {
                    if( tCur - item.tLogout >= 10 * 1000 ) {
                        sm.aDisconnect.push(id);
                    }
                }
            });

            //  실제 Delete 처리
            for( let idx in sm.aDisconnect ) {
                sm.mUsers.delete(sm.aDisconnect[idx]);
            }

            //  자동 퀴즈 매니저
            AutoQuizMan.update( tCur );

        }catch(e) {

        }
    }

    sendPacket( socket, protocol, data ) {
        socket.emit(protocol, data);
    }

    broadcastPacket( protocol, data ) {
        this.io.sockets.in('auth').emit( protocol, data );
    }

    setPreListener( socket ) {
        const sm = this;
        socket.on(P.SOCK.LoginRequest, function(packet) { sm.onLoginRequest(socket, packet); })
    }

    setPostListener( socket ) {
        const sm = this;
        socket.on(P.SOCK.Disconnect, function() { sm.onDisconnect(socket); })
    }

    onLoginRequest( socket, packet ) {
        try {
            let ip = socket.handshake.address.substr(7);
            if( socket.handshake.headers['x-real-ip'] != null ) {
                ip = socket.handshake.headers['x-real-ip'];
            }

            const sm = this;
            this.login(socket, packet.id, packet.pw, ip)
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

    createUser( ret ) {
        const sm = ret.sm;
        const socket = ret.sock;
        socket.handshake.session.userdata = { id: ret.id };
        socket.handshake.session.save();

        socket.join('auth');

        return new Promise(function(resolve, reject) {
            const newUser = new User(socket);
            sm.mUsers.set(ret.id, newUser);
            console.log('createUser', socket.handshake.session.userdata);
            resolve(ret);
        });
    }

    //  유저가 접속합니다.
    connectUser(socket) {
        const userdata = socket.handshake.session.userdata;
        this.setPreListener(socket);
        if( !userdata ) {
            this.sendPacket(socket, P.SOCK.NotLogined, {});
            return;
        }

        this.setPostListener(socket);

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

        const client = this.mUsers.get(id);
        client.socket = socket;
        client.tLogout = 0;

        if( AutoQuizMan.isQuizRunning() ) {
            this.sendPacket(socket, P.SOCK.QuizData, AutoQuizMan.getCurQuizData());
        }
    }
}

module.exports = ServerManager;