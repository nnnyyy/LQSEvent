/**
 * Created by nnnyy on 2018-11-24.
 */
const VueBus = {
    CloseInventory: "CloseInentory",
    StartTimer: "StartTimer",
    SOCK: {
        NotLogined: "NotLogined",
        LoginRequest: "LoginRequest",
        Disconnect: "disconnect",
        QuizData: "QuizData",
        QuizDataResult: "QuizDataResult",
        QuizAnswer: "QuizAnswer"
    }
};

module.exports = VueBus;