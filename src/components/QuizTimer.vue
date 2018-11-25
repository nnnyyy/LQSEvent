<template>
    <div class="quiztimer" :style="mainStyle">
        <div class="line" :style="lineStyle">
        </div>
    </div>
</template>

<script>
    import P from '../../common/protocol';
    export default {
        props: ['width', 'align','lineColor'],
        data: function () {
            return {
                intervalId: -1,
                tStart: 0,
                tElapsed: 0,
                mainStyle: {
                },
                lineStyle: {
                    width: "100%"

                },
                tLimitMs: 0
            };
        },
        created: function() {
            this.mainStyle.width = this.width + 'px';
            if( this.align === "center") {
                this.mainStyle.margin = "0 auto";
            }

            this.lineStyle.backgroundColor = this.lineColor;

            this.$bus.$on(P.StartTimer, this.onStartTimer);
        },
        methods: {
            onStartTimer: function(tLimit) {
                const v = this;
                this.tStart = new Date();
                this.tLimitMs = tLimit;
                this.intervalId = setInterval(function() {
                    const tElapsed = v.getElapsed();
                    v.tElapsed = tElapsed;
                    const p = tElapsed / v.tLimitMs * 100.0;
                    v.lineStyle.width = Math.floor(100.0 - p) + '%';
                    if( tElapsed >= v.tLimitMs ) {
                        clearInterval(v.intervalId);
                    }
                }, 30);
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
        height: 6px;
    }

    .line {
        height: 6px;
    }
</style>