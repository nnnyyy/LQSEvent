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
        this.checkReconnect()
            .then(this.getInfo);
    }

    checkReconnect() {
        return new Promise(function(resolve, reject) {
            console.log('checkReconnect');
            resolve();
        });
    }

    getInfo() {
        return new Promise(function(resolve, reject) {
            console.log('getInfo');
            resolve();
        });
    }
}

module.exports = ServerManager;