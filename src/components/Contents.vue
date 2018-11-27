<template>
    <div id="contents">
        <!--
        <template v-for="item in items">
            <post-card
                    :title="item.title"
                    :regdate="item.regdate"
                    :desc="item.desc"
                    :type="item.type"
                    ></post-card>
        </template>
        -->
        <quiz-answer-list></quiz-answer-list>
        <quiz-timer width="400" align="center" lineColor="#770077"></quiz-timer>

        <login-form></login-form>

        <!-- 화면 우측 인벤토리 -->
        <inventory></inventory>
    </div>
</template>

<script>
    import DataList from './DataList.vue';
    import PostCard from './PostCard.vue';
    import Inventory from './Inventory.vue';
    import QuizTimer from './QuizTimer.vue';
    import QuizAnswerList from './QuizAnswerList.vue';
    import LoginForm from './LoginForm.vue';
    import $ from 'jquery';

    import G from '../global';

    export default {
        data: function () {
            return {
                items: [
                    {title: "9시 원픽 당첨자", desc: "당첨자 : 왕야옹", regdate: '2018-11-23 08:10:00', type: 0 },
                    {title: "인원 맞히기", desc: "<a href=''>이거</a> vs <a href=''>저거</a><br>우승자는?!<br><br><br><br>바로<br><br><br>", regdate: '2018-11-23 08:10:00', type: 1},
                    {title: "9시 원픽 당첨자", desc: "당첨자 : 잼잼이", regdate: '2018-11-23 08:10:00', type: 0}
                ],
                lastIdx: 0
            };
        },
        components: {
            'data-list': DataList,
            'post-card': PostCard,
            'inventory': Inventory,
            'quiz-timer': QuizTimer,
            'quiz-answer-list': QuizAnswerList,
            'login-form': LoginForm
        },
        methods: {
            checkScrollToEnd: function() {

            },
            onScroll: function(o) {
                if( $(window).scrollTop() + $(window).height() === $(document).height() ) {
                    //this.items.push({title: "9시 원픽 당첨자", desc: "자동로그", regdate: '2018-11-23 08:10:00',type: 1});
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
        height: auto;
        margin: 0 auto;
    }
</style>