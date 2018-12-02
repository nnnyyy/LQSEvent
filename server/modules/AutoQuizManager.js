/**
 * Created by nnnyyy on 2018-11-26.
 */
'use strict'

const P = require('../../common/protocol');
const DBHelper = require('./DBHelper');
const Promise = require('promise');
const User = require('./User');

class AutoQuizManager {
    constructor() {
    }

    init( sm ) {
        this.serverMan = sm;
        this.isRunning = false;
        this.mUserSelect = new Map();
        this.aSelect = [0,0,0];
        this.prevQuizObjStr = "";
        this.tUpdate500ms = 0;
        this.tUpdate30s = 0;
        this.aTop10 = [];
        this.tStart = 0;
        this.quizRecordRankList = [];
    }

    update(tCur) {
        try {
            const aqm = this;
            if( !this.isRunning && tCur - this.tStart >= 1000 ) {
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
                    aqm.aSelect = [0,0,0];
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
                                try {
                                    let user = aqm.serverMan.getUser( id );
                                    if( !user ) return;
                                    //  문제 끊길 시 초기화  처리
                                    //const isComboInit = aqm.prevQuizObjStr !== user.lastQuizObjectStr;
                                    const isComboInit = false;

                                    user.lastQuizObjectStr = curQuizObjStr;


                                    if( quizObj.collect == answerIdx ) {
                                        user.incPoint += 3;
                                        user.saveFlag |= User.getSaveFlag().SFLAG_INC_POINT;

                                        if( !isComboInit ) {
                                            user.quizCombo++;
                                            const incPoint = aqm.getComboPoint(user.quizCombo);
                                            user.incPoint += incPoint;
                                            user.saveFlag |= User.getSaveFlag().SFLAG_INC_POINT;
                                        }
                                        else {
                                            user.quizCombo = 1;
                                        }
                                    }
                                    else {
                                        if( user.quizCombo > 0 && user.quizCombo > user.maxCombo ) {
                                            user.maxCombo = user.quizCombo;
                                            user.saveFlag |= User.getSaveFlag().SFLAG_MAX_COMBO;
                                        }
                                        user.quizCombo = 0;
                                    }

                                    aqm.serverMan.sendPacket( user.socket, P.SOCK.ComboInfo, {cnt: user.quizCombo, point: user.point + user.incPoint});
                                }
                                catch(e) {
                                    console.log(e);
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
                            this.tStart = tCur;
                            this.state = 0;
                            this.isRunning = false;
                        }
                        break;
                    }

                }
            }

            if( tCur - this.tUpdate500ms >= 500 ) {
                this.tUpdate500ms = tCur;
                let aUserSorted = [];
                this.serverMan.mUsers.forEach(function(user, id ) {
                    if( user.quizCombo )
                        aUserSorted.push({nick: user.nick, quizCombo: user.quizCombo, level: user.level});
                });

                this.serverMan.broadcastPacket( P.SOCK.QuizAnswerCnt, {cnts: aqm.aSelect});

                aUserSorted.sort(function(u1, u2) {
                    return u2.quizCombo - u1.quizCombo;
                });

                this.aTop10 = aUserSorted.slice(0, 10);

                aqm.serverMan.broadcastPacket( P.SOCK.CurrentComboRank, { ranker: this.aTop10 } );
            }

            if( tCur - this.tUpdate30s >= 1000 * 30 ) {
                this.tUpdate30s = tCur;
                DBHelper.getQuizRecordRank(function(result) {
                    aqm.quizRecordRankList = result.list;
                    aqm.serverMan.broadcastAllPacket( P.SOCK.QuizRecordRank, {list: result.list});
                });
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
            this.aSelect[answerIdx]++;

            if( this.mUserSelect.size == 1 ) {
                //  최초 선택자
                const user = this.serverMan.getUser( id );
                this.serverMan.broadcastPacket(P.SOCK.AnswerFirstSelectUser, {nick: user.nick, level: user.level });
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    getComboPoint( combo ) {

        if( combo == 5 ) return 10;

        if( combo == 10 ) return 20;

        if( combo == 20 ) return 30;

        if( combo == 30 ) return 40;

        return 0;
    }
}

let _moduleObject = new AutoQuizManager();

module.exports = _moduleObject;