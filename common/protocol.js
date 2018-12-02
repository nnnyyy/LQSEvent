/**
 * Created by nnnyy on 2018-11-24.
 */
const VueBus = {
    CloseInventory: "CloseInentory",
    StartTimer: "StartTimer",
    SetAlertMsg: "SetAlertMsg",
    OpenGachaBox: "OpenGachaBox",
    SOCK: {
        NotLogined: "NotLogined",
        LoginRequest: "LoginRequest",
        Disconnect: "disconnect",
        QuizData: "QuizData",
        QuizDataResult: "QuizDataResult",
        QuizAnswer: "QuizAnswer",
        AlertMsg: "AlertMsg",
        ComboInfo: "ComboInfo",
        Logout: "Logout",
        QuizAnswerCnt: "QuizAnswerCnt",
        CurrentComboRank: "CurrentComboRank",
        AnswerFirstSelectUser: "AnswerFirstSelectUser",
        QuizRecordRank: "QuizRecordRank"
    }
};

module.exports = VueBus;