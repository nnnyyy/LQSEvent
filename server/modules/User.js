/**
 * Created by nnnyyy on 2018-11-28.
 */
'use strict';

const SAVEFLAG = {
    SFLAG_INC_POINT: 0X01,
    SFLAG_MAX_COMBO: 0x02
};

class User {
    constructor(socket) {
        this.socket = socket;
        this.quizCombo = 0;
        this.saveFlag = 0;
        this.maxCombo = 0;
        this.incPoint = 0;
        this.lastQuizObjectStr = "";
    }

    static getSaveFlag() {
        return SAVEFLAG;
    }
}

module.exports = User;