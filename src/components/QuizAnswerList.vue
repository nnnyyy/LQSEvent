<template>
    <div class="quizanswerlist" v-show="visible">
        <ul>
            <template v-for="item in answers">
                <li>
                    <div class="answer" :style="item.style" @click="onBtnSelectAnswer(item.number-1)">
                        {{item.number}}. {{item.answer}}
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    import P from '../../common/protocol.js';
    import G from '../global';

    export default {
        data: function () {
            return {
                answers: [],
                visible: true,
                selectable: false
            };
        },
        created: function() {
            const item = { number: 1, answer: "보기", style: {} }
            this.answers.push(item);
            this.answers.push(item);
            this.answers.push(item);

            const v = this;
            this.$bus.$on(P.SOCK.NotLogined, this.onNotLogined);
            this.$bus.$on(P.SOCK.LoginRequest, this.onLoginRequest);
            this.$bus.$on(P.SOCK.QuizData, function( data ) {
                const packet = JSON.parse(data);
                v.answers = [];
                v.answers.push({number: 1, answer: packet.answer[0], style: {"backgroundColor": "inherit"}});
                v.answers.push({number: 2, answer: packet.answer[1], style: {"backgroundColor": "inherit"}});
                v.answers.push({number: 3, answer: packet.answer[2], style: {"backgroundColor": "inherit"}});
                v.selectable = true;
            });

            this.$bus.$on(P.SOCK.QuizDataResult, function( data ) {
                const packet = JSON.parse(data);
                v.answers[packet.collect].style = {
                    "backgroundColor": "#3e58a7",
                    "color": "white"
                };
            });
        },
        methods: {
            onNotLogined: function() {
                this.visible = false;
            },
            onLoginRequest: function() {
                this.visible = true;
            },
            onBtnSelectAnswer: function( idx ) {
                if( this.selectable ) {
                    this.answers[idx].style["backgroundColor"] = "red";
                    G.sendPacket(P.SOCK.QuizAnswer, {answer: idx});
                    this.selectable = false;
                }
            }
        }
    }
</script>

<style scoped>
    .quizanswerlist {
        text-align: center;
        margin: 0 auto;
    }

    ul {
    }

    li {
        margin: 60px 4px;
    }

    .answer {
        width: 700px;
        height: 70px;
        line-height: 70px;
        margin: 0 auto;
        font-size: 26px;
        cursor: pointer;
    }
</style>