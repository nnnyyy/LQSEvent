/**
 * Created by nnnyyy on 2018-11-28.
 */
'use strict'

class User {
    constructor(socket) {
        this.socket = socket;
        this.quizCombo = 0;
        this.saveFlag = false;
        this.maxCombo = 0;
    }
}

module.exports = User;