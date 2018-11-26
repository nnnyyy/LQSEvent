/**
 * Created by nnnyyy on 2018-11-22.
 */
'use strict'
const http = require('http');
const socketio = require('socket.io');
const Promise = require('promise');

class ServerManager {
    constructor(app) {
        console.log('ServerManager Init');
        this.http = http.Server(app);
        this.io = socketio(this.http);
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
            sm.addUser(socket);
        });
    }

    update() {
    }

    addUser(socket) {
        const id = socket.handshake.session.username;
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