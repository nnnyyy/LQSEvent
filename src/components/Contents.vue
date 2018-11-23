<template>
    <div id="contents">
        <template v-for="item in items">
            <post-card
                    :title="item.title"
                    :regdate="item.regdate"
                    :desc="item.desc"
                    ></post-card>
        </template>
    </div>
</template>

<script>
    import DataList from './DataList.vue';
    import PostCard from './PostCard.vue';
    import $ from 'jquery';

    export default {
        data: function () {
            return {
                items: [
                    {title: "9시 원픽 당첨자", desc: "자동로그", regdate: '2018-11-23 08:10:00'},
                    {title: "9시 원픽 당첨자", desc: "우승자가 드디어 나왔다!", regdate: '2018-11-23 08:10:00'},
                    {title: "9시 원픽 당첨자", desc: "자동로그", regdate: '2018-11-23 08:10:00'}
                ]
            };
        },
        components: {
            'data-list': DataList,
            'post-card': PostCard
        },
        methods: {
            checkScrollToEnd: function() {

            },
            onScroll: function(o) {
                if( $(window).scrollTop() + $(window).height() === $(document).height() ) {
                    //this.items.push({title: "9시 원픽 당첨자", desc: "자동로그", regdate: '2018-11-23 08:10:00'});
                    //requestNextPost();
                }
            }
        },
        mounted: function() {

        },
        created: function() {
            window.addEventListener('scroll', this.onScroll);
        },
        destroyed: function() {

        }
    }
</script>

<style>
    li {
        list-style: none;
    }

    #contents {
        padding: 10px;
        width: 70%;
        height: auto;
        margin: 0 auto;
    }
</style>