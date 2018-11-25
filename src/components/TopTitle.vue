<template>
    <div class="toptitle">
        <div class="toptitle-inner" v-html="titleText">
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                titleText: "다음 중 잘못 표기 된 것은?"
            };
        },
        created: function() {
            const v = this;
            this.$bus.$on('QuizInfo', function(info) {
                const infoParsed = JSON.parse(info);
                v.titleText = infoParsed.q;
            });
        },
        methods: function() {
        }
    }
</script>

<style>
    .toptitle {
        height: inherit;
        width: 600px;
        margin: 0 auto;
        background-color: inherit;
    }

    .toptitle-inner {
        background-color: inherit;
        color: #cacaca;
        position: relative;
        top: 45%;
        text-align: center;
        font-size: 25px;
    }
</style>