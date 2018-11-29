/**
 * Created by nnnyyy on 2018-11-26.
 */
'use strict'

const P = require('../../common/protocol');
const DBHelper = require('./DBHelper');
const Promise = require('promise');

class AutoQuizManager {
    constructor() {
    }

    init( sm ) {
        this.serverMan = sm;
        this.isRunning = false;
        this.mUserSelect = new Map();
        this.prevQuizObjStr = "";
    }

    update(tCur) {
        try {
            const aqm = this;
            if( !this.isRunning ) {
                new Promise(function(resolve, reject) {
                    DBHelper.getRandQuiz(function(result) {
                        aqm.setQuiz(tCur, result.quizdata);
                        resolve();
                    });
                })
                .then(function() {
                    let quizObj = aqm.curQuizObject;
                        if( aqm.prevQuizObjStr === "" ) {
                            aqm.prevQuizObjStr = JSON.stringify(aqm.curQuizObject);
                        }
                    quizObj.tRemain = 10000;
                    quizObj.state = 0;
                    aqm.mUserSelect.clear();
                    aqm.serverMan.broadcastPacket( P.SOCK.QuizData, quizObj );
                })
                .catch(function(err) {
                    console.log(err);
                })
            }
            else {
                //  퀴즈가 진행 중일 때
                switch(this.state) {
                    //  답을 아직 받을 수 있는 상태
                    case 0:
                    {
                        if( tCur - this.tStart >= 10000 ) {
                            this.state++;
                            this.tStart = tCur;
                        }
                        break;
                    }

                    //  정답 발표 대기인 상태
                    case 1:
                    {
                        if( tCur - this.tStart >= 1000 ) {
                            this.state++;
                            this.tStart = tCur;
                            const quizObj = aqm.curQuizObject;
                            aqm.serverMan.broadcastPacket( P.SOCK.QuizDataResult, {collect: quizObj.collect} );
                            const curQuizObjStr = JSON.stringify(quizObj);

                            //  정답자 콤보 처리
                            this.mUserSelect.forEach(function(answerIdx, id ) {
                                let user = aqm.serverMan.getUser( id );
                                const isComboInit = aqm.prevQuizObjStr !== user.lastQuizObjectStr;

                                user.lastQuizObjectStr = curQuizObjStr;
                                if( !user ) return;
                                if( quizObj.collect == answerIdx && !isComboInit ) {
                                    user.quizCombo++;
                                }
                                else {
                                    user.quizCombo = 0;
                                }
                            });

                            aqm.prevQuizObjStr = curQuizObjStr;
                        }
                        break;
                    }

                    //  정답 발표 후
                    case 2:
                    {
                        if( tCur - this.tStart >= 5000 ) {
                            this.state = 0;
                            this.isRunning = false;
                        }
                        break;
                    }

                }
            }
        }catch(e) {
            console.log(e);
        }
    }

    setQuiz( tCur, quizObject ) {
        this.isRunning = true;
        this.curQuizObject = quizObject;
        this.tStart = tCur;
        this.state = 0;
    }

    isQuizRunning() {
        return this.isRunning;
    }

    getCurQuizData() {
        let cur = this.curQuizObject;
        const tCur = new Date();
        cur.state = this.state;
        cur.tRemain = ( 10000 - (tCur - this.tStart) );
        return cur;
    }

    onQuizAnswer(id, answerIdx) {
        try {
            if( this.mUserSelect.has(id) ) {
                return;
            }

            this.mUserSelect.set(id, answerIdx);
        }
        catch(e) {

        }
    }
}

let _moduleObject = new AutoQuizManager();

module.exports = _moduleObject;