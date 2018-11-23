<template>
    <div class="contents-item">
        <h3>{{title}}</h3>
        <h5>{{regdate}}</h5>
        <div class="desc" v-html="desc">
        </div>
    </div>
</template>

<script>
    import DataList from './DataList.vue';

    export default {
        data: function() {
            return {
            }
        },
        props: ['title', 'regdate', 'desc'],
        components: {
            'data-list': DataList
        }
    }
</script>

<style>
    .contents-item {
        height: 200px;
        background-color: #ffe87c;
        margin: 8px 0;
    }

    .contents-item h3,h5 {
        background-color: inherit;
        padding: 4px;
    }
</style>

<style scoped>
    .desc {
        margin: 10px;
        background-color: inherit;
    }
</style>