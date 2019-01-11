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
            onLogin() {
                G.hpost(P.HTTP.Login, {id: 'nnnyyy84', pw: 's1980819'}, data => {
                    window.location.href = '/';
                });
            }
        },
        created() {

        }
    }
</script>

<style scoped>    
#main {

}
</style>