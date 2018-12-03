<template>
    <div id="statistics">
        <top></top>
        <contents></contents>
    </div>
</template>

<script>
    import G from './global.js';
    import P from '../common/protocol.js';
    import Top from './components/TopStatistics.vue';
    import Contents from './components/ContentsStatistics.vue';

    export default {
        data: function () {
            return {};
        },
        components: {
            'top': Top,
            'contents': Contents
        },
        methods: {

        },
        created: function() {

        }
    }
</script>

<style>

</style>
<style scoped>
    #statistics {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
</style>