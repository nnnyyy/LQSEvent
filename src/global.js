/**
 * Created by nnnyyy on 2018-11-21.
 */
'use strict';

import P from '../common/protocol';

class Global {
    constructor() {
        console.log(`Global value created`);
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
    }

    setQuizInfo() {
        const info = {q: "테스트 문제입니다", a: [ "테스트1", "테스트2", "테스트3" ]};
        this.vBus.$bus.$emit("QuizInfo", JSON.stringify(info));
        this.vBus.$bus.$emit(P.StartTimer, 10000);
    }

    onNotLogined( packet ) {
        const info = {q: "로그인 후에 이용 해 주세요", a: [ "테스트1", "테스트2", "테스트3" ]};
        this.vBus.$bus.$emit(P.SOCK.NotLogined, "");
        //v.$bus.$emit("QuizInfo", JSON.stringify(info));
    }

    onLoginRequest( packet ) {
        console.log("onLoginRequest", packet);
        if( packet.ret == 0 )
            this.vBus.$bus.$emit(P.SOCK.LoginRequest, "");
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
        this.vBus.$bus.$emit(P.SOCK.ComboInfo, packet.cnt);
    }

    sendPacket( protocol, packetData ) {
        this.socket.emit(protocol, packetData);
    }
}

const GlobalObject = new Global();

export default GlobalObject