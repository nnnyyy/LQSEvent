<template>
    <div style="margin: 0 auto; width: 800px; height: inherit; background-color: inherit;">
        <div class="toptitle">
            <div class="toptitle-inner" v-html="titleText">
            </div>
        </div>
    </div>
</template>

<script>
    import P from '../../common/protocol.js';

    export default {
        data: function () {
            return {
                titleText: "다음 중 잘못 표기 된 것은 무엇일까요?"
            };
        },
        created: function() {
            const v = this;
            this.$bus.$on(P.SOCK.NotLogined, this.onNotLogined);
            this.$bus.$on(P.SOCK.LoginRequest, this.onLoginRequest);
            this.$bus.$on(P.SOCK.QuizData, function( data ) {
                const packet = JSON.parse(data);
                v.titleText = packet.question;
            });
        },
        methods: {
            onNotLogined: function() {
                this.titleText = "로그인 후에 이용 해 주세요"
            },
            onLoginRequest: function() {
                this.titleText = "다음 문제를 기다리고 있습니다"
            }
        }
    }
</script>

<style>
    .toptitle {
        text-align: center;
        height: inherit;
        width: 800px;
        background-color: inherit;
        display: table-cell;
        vertical-align: middle;
    }

    .toptitle-inner {
        display: inline-block;
        background-color: inherit;
        color: #ffffff;
        font-weight: 900;
        position: relative;
        text-align: center;
        font-size: 28px;
    }
</style>