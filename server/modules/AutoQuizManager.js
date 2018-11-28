/**
 * Created by nnnyyy on 2018-11-26.
 */
'use strict'

const P = require('../../common/protocol');
const DBHelper = require('./DBHelper');

class AutoQuizManager {
    constructor() {
        this.tTestSend = 0;
    }

    init( sm ) {
        this.serverMan = sm;
    }

    update(tCur) {
        try {
            if( tCur - this.tTestSend >= 5000 ) {
                this.serverMan.broadcastPacket( P.SOCK.TestPacket, { title: "테스트" } );
                this.tTestSend = tCur;
            }
        }catch(e) {

        }
    }
}

let _moduleObject = new AutoQuizManager();

module.exports = _moduleObject;