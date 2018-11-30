/**
 * Created by nnnyy on 2018-11-24.
 */
const VueBus = {
    CloseInventory: "CloseInentory",
    StartTimer: "StartTimer",
    SetAlertMsg: "SetAlertMsg",
    SOCK: {
        NotLogined: "NotLogined",
        LoginRequest: "LoginRequest",
        Disconnect: "disconnect",
        QuizData: "QuizData",
        QuizDataResult: "QuizDataResult",
        QuizAnswer: "QuizAnswer",
        AlertMsg: "AlertMsg",
        ComboInfo: "ComboInfo",
        Logout: "Logout"
    }
};

module.exports = VueBus;