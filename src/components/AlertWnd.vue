<template>
    <div :class= "{ open: open, alert_mobile: isMobile }" class="alert-wnd">
        <div class="inner" v-html="contents">
        </div>
    </div>
</template>

<script>
    import P from '../../common/protocol.js';
    import G from '../global';

    export default {
        data: function () {
            return {
                open: false,
                contents: '테스트',
                isMobile: G.isMobile()
            };
        },
        components: {},
        methods: {
            onOpen: function() {
                this.open = true;
            },
            onClose: function() {
                this.open = false;
            },
            setContents: function( contents ) {
                const v = this;
                this.contents = contents;
                this.onOpen();
                setTimeout(function(){
                    v.onClose();
                }, 2700);
            }
        },
        created: function() {
            const v = this;
            this.$bus.$on(P.SetAlertMsg, function( contents ) {
                v.setContents( contents );
            });
        }
    }
</script>

<style>

</style>
<style scoped>
    .alert-wnd {
        position: absolute;
        width: 440px;
        height: 80px;
        top: 50px;
        left: -440px;
        background-color: white;
        transition: all 0.3s;
        opacity: 0.8;
        text-align: center;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .alert_mobile {
        width: 100%;
        opacity: 0.9;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .open {
        left: 0px;
    }

    .inner {
        margin: 0 auto;
        background-color: inherit;
        line-height: 80px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: 17px;
        font-weight: 500;
    }
</style>