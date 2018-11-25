/**
 * Created by nnnyyy on 2018-11-21.
 */
'use strict';

import P from '../common/protocol';

class Global {
    constructor() {
        console.log(`Global value created`);
    }

    setQuizInfo() {
        const info = {q: "테스트 문제입니다", a: [ "테스트1", "테스트2", "테스트3" ]};
        const v = new Vue();
        v.$bus.$emit("QuizInfo", JSON.stringify(info));
        v.$bus.$emit(P.StartTimer, 10000);
    }
}

const GlobalObject = new Global();

export default GlobalObject