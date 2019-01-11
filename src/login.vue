<template>
<div id="main">
    <button @click="onLogin">로그인</button>
</div>    
</template>

<script>
    import G from './global.js';
    import P from '../common/protocol.js';

    export default {
        data: function () {
            return {

            };
        },
        components: {
        },
        methods: {
            onCheckLoginRet(packet) {                
                if( packet.ret === 0 ) {
                    window.location.href = '/';
                }
            },
            onLogin() {
                G.hpost(P.HTTP.Login, {id: 'nnnyyy84', pw: 's1980819'}, data => {
                    if( data.ret === 0 ) {
                        window.location.href = '/';
                    }                    
                    else {
                        alert('아이디 또는 비번이 맞지 않습니다');
                    }
                });
            }
        },
        created() {

        },
        mounted() {
            G.hget(P.HTTP.CheckLogin, this.onCheckLoginRet);
        }
    }
</script>

<style scoped>    
#main {

}
</style>