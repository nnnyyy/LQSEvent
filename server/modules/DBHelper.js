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
            Log.logger.debug('DB Failed - getActivePoint');
            cb({ret: -1});
        }
    }
}


const _obj = new DBHelper();
module.exports = _obj;