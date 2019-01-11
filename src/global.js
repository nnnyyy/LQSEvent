/**
 * Created by nnnyyy on 2018-11-21.
 */
'use strict';

import P from '../common/protocol';

class Global {
    constructor() {
        this.vBus = new Vue();
    }

    connectSocket() {
        console.log('socket connecting...');
        this.socket = io();
        this.initSocketListener();
    }

    initSocketListener() {
        const g = this;        
        this.socket.on(P.SOCK.QuizData, function(packet) { g.onQuizData(packet); });
        this.socket.on(P.SOCK.QuizDataResult, function(packet) { g.onQuizDataResult(packet); });
        this.socket.on(P.SOCK.AlertMsg, function(packet) { g.onAlertMsg(packet); });
        this.socket.on(P.SOCK.ComboInfo, function(packet) { g.onComboInfo(packet); });
        this.socket.on(P.SOCK.QuizAnswerCnt, function(packet) { g.onQuizAnswerCnt(packet); });
        this.socket.on(P.SOCK.CurrentComboRank, function(packet) { g.onCurrentComboRank(packet); });
        this.socket.on(P.SOCK.AnswerFirstSelectUser, function(packet) { g.onAnswerFirstSelectUser(packet); });
        this.socket.on(P.SOCK.QuizRecordRank, function(packet) { g.onQuizRecordRank(packet); });        
    }

    isMobile() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // is mobile..
            return true;
        }

        return false;
    }

    emit(protocol, data) {
        this.vBus.$bus.$emit(protocol, data);
    }    

    on( protocol, cb ) {
        this.vBus.$bus.$on(protocol, cb);
    }

    hget( addr, cb ) {
        this.vBus.$http.get(addr).then(res => cb(res.data))
        .catch(err => console.log(err));
    }

    hpost( addr, item, cb ) {        
        this.vBus.$http.post(addr, item).then(res => cb(res.data))
        .catch(err => console.log(err));
    }

    sendPacket( protocol, packetData ) {
        this.socket.emit(protocol, packetData);
    }

    setQuizInfo() {
        const info = {q: "테스트 문제입니다", a: [ "테스트1", "테스트2", "테스트3" ]};
        this.vBus.$bus.$emit("QuizInfo", JSON.stringify(info));
        this.vBus.$bus.$emit(P.StartTimer, 10000);
    }

    onQuizData( packet ) {        
        this.vBus.$bus.$emit(P.SOCK.QuizData, JSON.stringify( packet ));
        if( packet.state == 0 ) {
            this.vBus.$bus.$emit(P.StartTimer, { remain: packet.tRemain, max: 10000 });
        }
    }

    onQuizDataResult( packet ) {
        this.vBus.$bus.$emit(P.SOCK.QuizDataResult, JSON.stringify( packet ));
    }

    onAlertMsg( packet ) {
        this.vBus.$bus.$emit(P.SetAlertMsg, packet.msg);
    }

    onComboInfo( packet ) {
        this.showComboAlert( packet.cnt );
        this.vBus.$bus.$emit(P.SOCK.ComboInfo, packet);
    }

    onQuizAnswerCnt( packet ) {
        this.vBus.$bus.$emit(P.SOCK.QuizAnswerCnt, packet);
    }

    onCurrentComboRank( packet ) {
        this.vBus.$bus.$emit(P.SOCK.CurrentComboRank, packet);
    }

    onAnswerFirstSelectUser( packet ) {
        const msg = packet.nick + '님이 제일 먼저 선택했습니다';
        this.vBus.$bus.$emit(P.SetAlertMsg, msg);
    }

    onQuizRecordRank( packet ) {
        this.vBus.$bus.$emit(P.SOCK.QuizRecordRank, packet);
    }    

    showComboAlert( cnt ) {
        if( cnt < 2 ) return;

        if( cnt == 5 ) {
            this.vBus.$bus.$emit(P.OpenGachaBox, {name: '놀라셨죠? 아직 테스트 중이라 뭐 없어요~ㅋㅋ'});
        }

        let msg = cnt + " 콤보!";
        if( cnt >= 10 && cnt % 5 == 0 ) {
            msg += ' 대단합니다!';
        }

        this.vBus.$bus.$emit(P.SetAlertMsg, msg);
    }
}

const GlobalObject = new Global();

export default GlobalObject