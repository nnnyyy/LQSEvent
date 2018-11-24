<template>
    <div class="quiztimer">
        {{ tElapsed }}
    </div>
</template>

<script>
    import P from '../../common/protocol';
    export default {
        data: function () {
            return {
                intervalId: -1,
                tStart: 0,
                tElapsed: 0
            };
        },
        created: function() {
            this.$bus.$on(P.StartTimer, this.onStartTimer);
        },
        methods: {
            onStartTimer: function() {
                const v = this;
                this.tStart = new Date();
                this.intervalId = setInterval(function() {
                    const tElapsed = v.getElapsed();
                    v.tElapsed = tElapsed;
                    if( tElapsed >= 5000 ) {
                        clearInterval(v.intervalId);
                    }
                }, 500);
            },
            getElapsed: function() {
                const tCur = new Date();
                return tCur - this.tStart;
            }
        }
    }
</script>

<style>
</style>

<style scoped>
    .quiztimer {
        text-align: center;
    }
</style>