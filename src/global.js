/**
 * Created by nnnyyy on 2018-11-21.
 */
'use strict';

import P from '../common/protocol';

class Global {
    constructor() {
        this.socket = io();
        this.initSocketListener();
        this.vBus = new Vue();
    }

    initSocketListener() {
        const g = this;
        this.socket.on(P.SOCK.NotLogined, function(packet) { g.onNotLogined(packet); });
        this.socket.on(P.SOCK.LoginRequest, function(packet) { g.onLoginRequest(packet); });
        this.socket.on(P.SOCK.QuizData, function(packet) { g.onQuizData(packet); });
        this.socket.on(P.SOCK.QuizDataResult, function(packet) { g.onQuizDataResult(packet); });
        this.socket.on(P.SOCK.AlertMsg, function(packet) { g.onAlertMsg(packet); });
        this.socket.on(P.SOCK.ComboInfo, function(packet) { g.onComboInfo(packet); });
        this.socket.on(P.SOCK.QuizAnswerCnt, function(packet) { g.onQuizAnswerCnt(packet); });
        this.socket.on(P.SOCK.CurrentComboRank, function(packet) { g.onCurrentComboRank(packet); });
    }

    isMobile() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // is mobile..
            return true;
        }

        return false;
    }

    setQuizInfo() {
        const info = {q: "테스트 문제입니다", a: [ "테스트1", "테스트2", "테스트3" ]};
        this.vBus.$bus.$emit("QuizInfo", JSON.stringify(info));
        this.vBus.$bus.$emit(P.StartTimer, 10000);
    }

    onNotLogined( packet ) {
        if( packet.ret == -2 ) {
            alert('중복 접속입니다!');
            return;
        }
        const info = {q: "로그인 후에 이용 해 주세요", a: [ "테스트1", "테스트2", "테스트3" ]};
        this.vBus.$bus.$emit(P.SOCK.NotLogined, packet);
    }

    onLoginRequest( packet ) {
        if( packet.ret == 0 )
            this.vBus.$bus.$emit(P.SOCK.LoginRequest, packet);
        else {
            alert('아이디 또는 비밀번호가 맞지 않습니다');
        }
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

    sendPacket( protocol, packetData ) {
        this.socket.emit(protocol, packetData);
    }

    showComboAlert( cnt ) {
        if( cnt < 2 ) return;

        let msg = cnt + " 콤보!";
        if( cnt >= 10 && cnt % 5 == 0 ) {
            msg += ' 대단합니다!';
        }

        this.vBus.$bus.$emit(P.SetAlertMsg, msg);
    }
}

const GlobalObject = new Global();

export default GlobalObject