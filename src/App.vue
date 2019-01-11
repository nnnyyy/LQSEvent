<template>
    <div id="main">        
    </div>
</template>

<script>    
    import G from './global';
    import P from '../common/protocol';

    export default {
        data: function() {
            return {
                isMobile: G.isMobile()
            }
        },
        components: {

        },
        methods: {
            onCheckLoginRet(packet) {                
                if( packet.ret === 0 ) {
                    G.connectSocket();
                }
                else {
                    window.location.href = '/login/'
                }
            }
        },
        mounted() {    
            G.hget(P.HTTP.CheckLogin, this.onCheckLoginRet);
        }
    }
</script>

<style scoped>

</style>