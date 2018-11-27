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
    }

    initSocketListener() {
        const g = this;
        this.socket.on(P.SOCK.NotLogined, function(packet) { g.onNotLogined(packet); });
        this.socket.on(P.SOCK.LoginRequest, function(packet) { g.onLoginRequest(packet); });
    }

    setQuizInfo() {
        const info = {q: "테스트 문제입니다", a: [ "테스트1", "테스트2", "테스트3" ]};
        const v = new Vue();
        v.$bus.$emit("QuizInfo", JSON.stringify(info));
        v.$bus.$emit(P.StartTimer, 10000);
    }

    onNotLogined( packet ) {
        const info = {q: "로그인 후에 이용 해 주세요", a: [ "테스트1", "테스트2", "테스트3" ]};
        const v = new Vue();
        v.$bus.$emit(P.SOCK.NotLogined, "");
        //v.$bus.$emit("QuizInfo", JSON.stringify(info));
    }

    onLoginRequest( packet ) {
        const v = new Vue();
        console.log("onLoginRequest", packet);
        if( packet.ret == 0 )
            v.$bus.$emit(P.SOCK.LoginRequest, "");
        else {
            alert('아이디 또는 비밀번호가 맞지 않습니다');
        }
    }

    sendPacket( protocol, packetData ) {
        this.socket.emit(protocol, packetData);
    }
}

const GlobalObject = new Global();

export default GlobalObject