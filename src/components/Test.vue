<template>
    <div>
        <h1>Test {{ testTitle }}</h1>
        <data-list :list="memberlist"></data-list>
        <data-list :list="ranker"></data-list>
        <data-list :list="recent"></data-list>
    </div>
</template>

<script>
    import DataList from './DataList.vue';

    export default {
        data: function() {
            return {
                memberlist: [
                    { name: '김탁구'},
                    { name: '왕야옹'}
                ],
                ranker: [
                    { name: '바이퍼'},
                    { name: '수잔'}
                ],
                recent: [
                    { name: '김야옹'},
                    { name: '굴드'}
                ]
            }
        },
        props: ['testTitle'],
        components: {
            'data-list': DataList
        }
    }
</script>