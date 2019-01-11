<template>
    <div id="contents">
        <quiz-answer-list></quiz-answer-list>
        <quiz-timer width="400" align="center" lineColor="#3e58a7"></quiz-timer>

        <login-form></login-form>
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
                ],
                lastIdx: 0
            };
        },
        components: {
            'data-list': DataList,
            'post-card': PostCard,
            'quiz-timer': QuizTimer,
            'quiz-answer-list': QuizAnswerList,
            'login-form': LoginForm
        },
        methods: {            
        },
        mounted: function() {

        },
        created: function() {

        },
        destroyed: function() {

        }
    }
</script>

<style>
</style>
<style scoped>
    li {
        list-style: none;
    }

    #contents {
        padding: 10px;
        height: auto;
        margin: 0 auto;
    }
</style>