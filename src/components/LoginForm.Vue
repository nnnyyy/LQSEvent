<template>
    <div :style="style" v-show="visible">
        <button @click="onBtnLogin">로그인</button>
    </div>
</template>

<script>
    import G from '../global.js';
    import P from '../../common/protocol.js';

    export default {
        data: function () {
            return {
                style: {
                    textAlign: "center",
                },
                visible: true
            };
        },
        components: {},
        methods: {
            onBtnLogin: function(e) {
                G.sendPacket(P.SOCK.LoginRequest, {});
            },
            onNotLogined: function() {
                this.visible = true;
            },
            onLoginRequest: function() {
                this.visible = false;
            }
        },
        created: function() {
            this.$bus.$on(P.SOCK.NotLogined, this.onNotLogined);
            this.$bus.$on(P.SOCK.LoginRequest, this.onLoginRequest);
        }
    }
</script>

<style>

</style>
<style scoped>

</style>