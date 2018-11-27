<template>
    <div class="quizanswerlist" v-show="visible">
        <ul>
            <template v-for="item in answers">
                <li>
                    <div class="answer">
                        {{item.number}}. {{item.answer}}
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    import P from '../../common/protocol.js';

    export default {
        data: function () {
            return {
                answers: [],
                visible: true
            };
        },
        created: function() {
            const item = { number: 1, answer: "보기" }
            this.answers.push(item);
            this.answers.push(item);
            this.answers.push(item);

            const v = this;
            this.$bus.$on(P.SOCK.NotLogined, this.onNotLogined);
            this.$bus.$on(P.SOCK.LoginRequest, this.onLoginRequest);
        },
        methods: {
            onNotLogined: function() {
                this.visible = false;
            },
            onLoginRequest: function() {
                this.visible = true;
            }
        }
    }
</script>

<style scoped>
    .quizanswerlist {
        text-align: center;
        margin: 0 auto;
    }

    .answer {
        margin: 60px 4px;
        font-size: 26px;
        cursor: pointer;
    }
</style>