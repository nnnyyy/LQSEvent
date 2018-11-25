<template>
    <div class="quizanswerlist">
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
    export default {
        data: function () {
            return {
                answers: []
            };
        },
        created: function() {
            const item = { number: 1, answer: "보기" }
            this.answers.push(item);
            this.answers.push(item);
            this.answers.push(item);

            const v = this;
            this.$bus.$on('QuizInfo', function(info) {
                const infoParsed = JSON.parse(info);
                v.answers = [];
                v.answers.push({number: 1, answer: infoParsed.a[0]});
                v.answers.push({number: 2, answer: infoParsed.a[1]});
                v.answers.push({number: 3, answer: infoParsed.a[2]});
            });
        }
    }
</script>

<style scoped>
    .quizanswerlist {
        text-align: center;
        margin: 0 auto;
    }

    .answer {
        margin: 20px 4px;
        font-size: 20px;
        cursor: pointer;
    }
</style>