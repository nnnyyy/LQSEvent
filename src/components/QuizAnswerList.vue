<template>
    <div class="quizanswerlist" :class="{quizanswerlist_mobile: isMobile}" v-show="visible">
        <ul>
            <template v-for="item in answers">
                <li :class="{qal_li_mobile: isMobile}">
                    <div class="answer" :class="{click: item.isClicked, answermobile: isMobile }" :style="item.style" @click="onBtnSelectAnswer(item.number-1)">
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
                selectable: false,
                isMobile: G.isMobile()
            };
        },
        created: function() {
            const item = { number: 1, answer: "보기", style: {}, isClicked: false }
            this.answers.push(item);
            this.answers.push(item);
            this.answers.push(item);

            const v = this;
            this.$bus.$on(P.SOCK.NotLogined, this.onNotLogined);
            this.$bus.$on(P.SOCK.LoginRequest, this.onLoginRequest);
            this.$bus.$on(P.SOCK.QuizData, function( data ) {
                const packet = JSON.parse(data);
                v.answers = [];
                v.answers.push({isClicked: false, number: 1, answer: packet.answer[0], style: {}});
                v.answers.push({isClicked: false, number: 2, answer: packet.answer[1], style: {}});
                v.answers.push({isClicked: false, number: 3, answer: packet.answer[2], style: {}});
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
                    this.answers[idx].isClicked = true;
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

    .quizanswerlist_mobile {
        width: 100%;
    }

    ul {
    }

    li {
        margin: 36px 4px;
    }

    .qal_li_mobile {
        margin: 10px 4px;
    }

    .answer {
        width: 700px;
        height: 70px;
        line-height: 70px;
        margin: 0 auto;
        font-size: 26px;
        cursor: pointer;
        transition: 0.5s;
    }

    .answermobile {
        width: 100%;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
    }

    .answer:hover {
        font-weight: 900;
        font-size: 30px;
        color: #3e58a7;
    }

    .answermobile:hover {
        font-size: 16px;
    }

    .click {
        background-color: yellowgreen;
    }
</style>