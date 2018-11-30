<template>
    <div :class= "{ open: open }" class="alert-wnd">
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
                contents: '테스트'
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
                }, 2000);
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