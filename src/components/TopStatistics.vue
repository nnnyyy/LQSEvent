<template>
    <div id="top-statistics">
    </div>
</template>

<script>
    import G from '../global.js';
    import P from '../../common/protocol.js';
    import Post from './PostCard.vue';

    export default {
        data: function () {
            return {};
        },
        components: {
            'post': Post
        },
        methods: {},
        created: function() {
        }
    }
</script>

<style>

</style>
<style scoped>
    #top-statistics {
        width: 100%;
        height: 84px;
        background-color: #3e58a7;
    }
</style>