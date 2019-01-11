<template>
    <div id="main">        
        <chat 
            :width="chatWidth" 
            titlebar
        />
    </div>
</template>

<script>    
    import G from './global';
    import P from '../common/protocol';
    import ChatWnd from './components/ChatWnd.vue'

    export default {
        data: function() {
            return {
                chatWidth: 450,
                isMobile: G.isMobile()
            }
        },
        components: {
            'chat': ChatWnd
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