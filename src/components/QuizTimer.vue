<template>
    <div class="quiztimer" :style="mainStyle" v-show="visible">
        <div class="line" :style="lineStyle">
        </div>
    </div>
</template>

<script>
    import P from '../../common/protocol';
    import G from '../global';
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
                tLimitMs: 0,
                visible: true
            };
        },
        created: function() {
            if( G.isMobile() ) {
                this.mainStyle.width = "90%";
            }
            else {
                this.mainStyle.width = this.width + 'px';
            }

            if( this.align === "center") {
                this.mainStyle.margin = "0 auto";
            }

            this.lineStyle.backgroundColor = this.lineColor;

            this.$bus.$on(P.StartTimer, this.onStartTimer);
            this.$bus.$on(P.SOCK.NotLogined, this.onNotLogined);
            this.$bus.$on(P.SOCK.LoginRequest, this.onLoginRequest);
        },
        methods: {
            onStartTimer: function(data) {
                const tLimit = data.max;
                const v = this;
                this.tStart = new Date();
                this.tStart -= (tLimit - data.remain);
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
            onNotLogined: function() {
                this.visible = false;
            },
            onLoginRequest: function() {
                this.visible = true;
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