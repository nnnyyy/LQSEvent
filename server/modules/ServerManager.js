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

class ServerManager {
    constructor(app) {
        console.log('ServerManager Init');
        this.http = http.Server(app);
        this.io = socketio(this.http);
        this.io.use(sharedsession(app.session));
        this.mUsers = new Map();
        this.init();
    }

    init() {
        const sm = this;
        new Promise(function(resolve, reject) {
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
    }

    sendPacket( socket, protocol, data ) {
        socket.emit(protocol, data);
    }

    setListener( socket ) {
        const sm = this;
        socket.on(P.SOCK.LoginRequest, function(packet) { sm.onLoginRequest(socket, packet); })
    }

    onLoginRequest( socket, packet ) {
        try {
            let ip = socket.handshake.address.substr(7);
            if( socket.handshake.headers['x-real-ip'] != null ) {
                ip = socket.handshake.headers['x-real-ip'];
            }

            const sm = this;
            this.login(packet.id, packet.pw, ip)
            .then(function(result) {
                sm.sendPacket(socket, P.SOCK.LoginRequest, result);
            })
            .catch(function(err) {
            });
        }catch(e) {

        }
    }

    login( id, pw, ip ) {
        return new Promise(function(resolve, reject) {
            DBHelper.login( id, pw, ip, function(result) {
                resolve(result);
            });
        });
    }

    //  유저가 접속합니다.
    connectUser(socket) {
        const id = socket.handshake.session.username;
        this.setListener(socket);
        if( !id ) {
            this.sendPacket(socket, P.SOCK.NotLogined, {});
            return;
        }
        if( this.checkReconnect(id) ) {
            this.setReconnect(id);
        }
    }

    checkReconnect(id) {
        const sm = this;
        console.log('checkReconnect');
        const client = sm.mUsers.get(id);
        if( !client ) {
            return false;
        }
        else {
            return true;
        }

    }

    setReconnect(id) {
        const client = this.mUsers.get(id);
        client.socket = socket;
        client.tLogout = 0;
    }

    getInfo(value) {
        console.log(value);
        return new Promise(function(resolve, reject) {
            console.log('getInfo');
            resolve();
        });
    }
}

module.exports = ServerManager;