<template>
    <div style="margin: 0 auto; width: 800px; height: inherit; background-color: inherit;">
        <div class="toptitle">
            <div class="toptitle-inner" v-html="titleText">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                titleText: "다음 중 잘못 표기 된 것은 무엇일까요?"
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
        color: #cacaca;
        position: relative;
        text-align: center;
        font-size: 28px;
    }
</style>