<template>
    <div class="user-info-bar">
        <div class="icon item">
            <img class="img-icon" :src="imageURL">
        </div>
        <div class="id item">왕야옹</div>
        <div class="id item">4레벨</div>
        <div class="id item">25000점</div>

        <div class="id item">퀴즈 정답 {{comboCount}} 콤보</div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
               imageURL: '/images/star0.png',
                comboCount: 20
            };
        },
        components: {},
        methods: {}
    }
</script>

<style>

</style>
<style scoped>
    .user-info-bar {
        width: 100%;
        height: 42px;
        background-color: #1e2a5d;
        border-bottom: 6px solid #334696;
    }

    .item {
        background-color: inherit;
        float: left;
    }

    .icon {
        width: 36px;
        height: 36px;
        margin-left: 16px;
    }

    .img-icon {
        width: inherit;
        height: inherit;
        background-color: inherit;
        padding: 4px;
    }

    .id {
        color: whitesmoke;
        line-height: 36px;
        margin-left: 8px;
    }
</style>