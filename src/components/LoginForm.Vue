<template>
    <div :style="style" v-show="visible">
        <table style="margin: 0 auto;">
            <tr>
                <td>아이디</td>
                <td><input type="text" v-model="iid" /></td>
            </tr>
            <tr>
                <td>비밀번호</td>
                <td><input type="password" v-model="ipw" /></td>
            </tr>
            <tr>
                <td colspan="2">
                    <button @click="onBtnLogin" style="width:100%; height: 50px;">로그인</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import G from '../global.js';
    import P from '../../common/protocol.js';

    export default {
        data: function () {
            return {
                iid:'',
                ipw:'',
                style: {
                    textAlign: "center",
                },
                visible: false
            };
        },
        components: {},
        methods: {
            onBtnLogin: function(e) {
                G.sendPacket(P.SOCK.LoginRequest, {id: this.iid, pw: this.ipw });
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
    * {
        font-size: 25px;
    }

    td {
        padding: 4px;
    }

    input {
        height:40px;
    }
</style>