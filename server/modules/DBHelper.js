/**
 * Created by nnnyy on 2018-11-27.
 */

class DBHelper {
    constructor() {
        this.sql = require('./MySQL');
        this.init();
    }

    init() {
    }

    login(id, pw, ip, cb) {
        try {
            this.sql.query("CALL login(?,?,?, @ret); select @ret;", [id, pw, ip] , function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                var ret = rows[rows.length - 1][0]['@ret'];
                var data = rows[0][0];
                cb({id: data.id, nick: data.nick, auth: data.auth_state, adminMemberVal: data.adminMemberVal, ret: ret});
            });
        }catch(err) {

            cb({ret: -99});
        }
    }

    getUserInfo(id, cb) {
        //  getBanCnt, getActivePoint 를 통합
        try {
            this.sql.query("CALL getUserInfo( ? )", [id], function(err, rows) {
                try {
                    if(err) {
                        console.log('error : ' + err);
                        cb({ret: -99});
                        return;
                    }
    
                    const IDX = {
                        OXWIN_CNT: 0,
                        BAN_CNT: 1, 
                        ACTIVE_POINT: 3
                    };
    
                    let info = {
                        oxwincnt: rows[IDX.OXWIN_CNT][0].cnt,
                        bancnt: rows[IDX.BAN_CNT][0].bancnt,
                        ap: rows[IDX.ACTIVE_POINT][0] ? rows[IDX.ACTIVE_POINT][0].ap : 0
                    }
    
                    cb({ret: 0, info: info });
                }
                catch(e) {
                    console.log(e);
                    cb({ret: -99 });
                }                
            });
        }catch(err) {
            console.log(err);
            cb({ret: -99 });
        }
    }

    getRandQuiz(cb) {
        try {
            this.sql.query("select * from quiz where quiz_idx >= 4 order by rand() limit 0,1", function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                var data = [];
                for( var i  = 0; i < rows.length ; ++i ) {
                    var d = rows[i];
                    data.push({idx: d.quiz_idx, question: d.question ,answer: [d.answer1, d.answer2, d.answer3], collect: d.collect_idx});
                }
                cb({ret:0, quizdata: data[0]});
            });
        }catch(err) {

            cb({ret: -99});
        }
    }

    getActivePoint(id, cb) {
        try {
            this.sql.query("CALL getActivePoint( ?, @point ); select @point;", [id], function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                var point = rows[rows.length - 1][0]['@point'];
                cb({ret: 0, point: point});
            });
        }catch(err) {
            //Log.logger.debug('DB Failed - getActivePoint');
            cb({ret: -1});
        }
    }

    getQuizInfo(id, cb) {
        try {
            this.sql.query("CALL getQuizRecord( ?, @maxCombo ); select @maxCombo;", [id], function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                var maxCombo = rows[rows.length - 1][0]['@maxCombo'];
                cb({ret: 0, maxCombo: maxCombo});
            });
        }catch(err) {
            //Log.logger.debug('DB Failed - getActivePoint');
            cb({ret: -1});
        }
    }

    getUserInfo(id, cb) {
        //  getBanCnt, getActivePoint 를 통합
        try {
            this.sql.query("CALL getUserInfo( ? )", [id], function(err, rows) {
                try {
                    if(err) {
                        console.log('error : ' + err);
                        cb({ret: -99});
                        return;
                    }
    
                    const IDX = {
                        OXWIN_CNT: 0,
                        BAN_CNT: 1, 
                        ACTIVE_POINT: 3
                    };
    
                    let info = {
                        oxwincnt: rows[IDX.OXWIN_CNT][0].cnt,
                        bancnt: rows[IDX.BAN_CNT][0].bancnt,
                        ap: rows[IDX.ACTIVE_POINT][0] ? rows[IDX.ACTIVE_POINT][0].ap : 0
                    }
    
                    cb({ret: 0, info: info });
                }
                catch(e) {
                    console.log(e);
                    cb({ret: -99 });
                }                
            });
        }catch(err) {

        }
    }

    getQuizRecordRank(cb) {
        try {
            this.sql.query("CALL getQuizRecordRank()", function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                const aDataList = rows[0];
                cb({ret: 0, list: aDataList});
            });
        }catch(err) {
            //Log.logger.debug('DB Failed - getActivePoint');
            cb({ret: -1});
        }
    }

    incPoint(id, incPoint, cb) {
        try {
            this.sql.query("CALL incActivePoint( ?, ? );", [id, incPoint], function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                cb({ret: 0});
            });
        }catch(err) {
            //Log.logger.debug('DB Failed - updateActivePoint');
            cb({ret: -1});
        }
    }

    savePoint(id, point, cb) {
        try {
            this.sql.query("CALL updateActivePoint( ?, ? );", [id, point], function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                cb({ret: 0});
            });
        }catch(err) {
            //Log.logger.debug('DB Failed - updateActivePoint');
            cb({ret: -1});
        }
    }

    saveMaxCombo(id, maxCombo, cb) {
        try {
            this.sql.query("CALL updateQuizRecord( ?, ? );", [id, maxCombo], function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                cb({ret: 0});
            });
        }catch(err) {
            //Log.logger.debug('DB Failed - updateActivePoint');
            cb({ret: -1});
        }
    }
}


const _obj = new DBHelper();
module.exports = _obj;