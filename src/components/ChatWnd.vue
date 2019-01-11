<template>
    <div id="chat-wnd" :style="{width: width + 'px'}" >
        <template v-if="titlebar">
        <div>타이틀 바</div>
        </template>
        <div class="chat-list-root" :style="{height: chatHeight + 'px'}">
            dfsfd
        </div>
        <div>
            <input type="text"/>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import G from '../global.js'
    import P from '../../common/protocol.js'    

    export default {
        props: {
            width: {
                type: Number,
                default: 100
            },
            chatHeight: {
                type: Number,
                default: 400
            },
            titlebar: Boolean
        },
        data: function () {
            return {                
            };
        },
        methods: {
            onResize: function(item) {                
            },
            addChatItem: function(item) {
                this.chatList.push(item);
            },
            clear: function() {
                this.chatList = [];
            },
            getImageUrl: function( level ) {
                return G.getLevelImgUrl(level);
            },
            ip: function(ip) {
                if( ip ) {
                    var aIpSplited = ip.split('.');
                    if( aIpSplited.length >= 4 ) {
                        aIpSplited[3] = 'xx';
                        ip = aIpSplited.join('.');
                    }
                }
                return ip;
            },
            chatFilter: function(item) {
                if( item.adminLevel > 0 ) {

                    switch(item.type) {
                        case 0: return '<b>' + item.msg + '</b>';
                        case 1: return '<span style="color: #000088">' + item.msg + '</span>';
                        default:
                            if( item.lastVote != -1 ) {
                                return '<span style="font-weight: bolder;">' + item.msg + '</span>'
                            }
                            return '<span style="color: #880000; font-weight: bolder;">' + item.msg + '</span>';
                    }
                }

                if( item.lastVote != -1 ) {
                    if(G.options.isShowVoteMoreThen4Level() && item.level < 4) {
                        return '<span style="font-weight: bolder;">' + '[투표] 4렙이상 표시 옵션에 의해 가려짐' + '</span>';
                    }
                }

                return item.msg;
            },
            getColor: function(item) {
                if( item.lastVote != -1 ) {
                    if(G.options.isShowVoteMoreThen4Level() && item.level < 4) {
                        return 'black';
                    }
                    return G.getVoteColor(item.lastVote);
                }
                return 'black';
            },
            onFlushChat: function(packet) {
                const newChatList = packet.list;
                this.checkScroll(true);

                for( let idx in newChatList ) {
                    const item = newChatList[idx];
                    this.addChatItem(item);
                }

                if( this.chatList.length > this.maxLine ) {
                    const delCnt = this.chatList.length - this.maxLine;
                    this.chatList = this.chatList.slice(delCnt, this.chatList.length);
                }
            },            
            onSendMsg: function(e) {
                let msg = $('.ip-msg').val();
                if( msg.trim() === '' ) return;
                if( this.SlashCommand(msg.trim()) ) {

                }
                else if( msg == "1") {
                    G.sendPacket(P.SOCK.Vote, {selectedIndex: 0 });
                    this.lostFocus();
                    return;
                }
                else if( msg == "2" ) {
                    G.sendPacket(P.SOCK.Vote, {selectedIndex: 1 });
                    this.lostFocus();
                    return;
                }
                else if( msg == "3") {
                    G.sendPacket(P.SOCK.Vote, {selectedIndex: 2 });
                    this.lostFocus();
                    return;
                }
                else if( msg == "4") {
                    G.sendPacket(P.SOCK.Vote, {selectedIndex: 3 });
                    this.lostFocus();
                    return;
                }
                else if( msg[0] == '=') {
                    $(this).val('');
                    var query = msg.substr(1).trim();
                    msg = '[계산]' + query + ' = ' + eval(query);
                    G.sendPacket(P.SOCK.Chat, {msg: msg});
                }
                else {
                    if( msg.length >= 100 ) {
                        alert('메시지가 너무 깁니다');
                        return;
                    }
                    if(G.adminLevel <= 0 )
                        msg = G.strip(msg);
                    G.sendPacket(P.SOCK.Chat, {msg: msg});
                }
                $('.ip-msg').val('');
                this.chatMsg = '';
            },            
            onSetChatFocus: function(data) {
                $('.ip-msg').val('');
                this.chatMsg  = '';
                $('.ip-msg').focus();
            },            
            checkScroll: function(bForced) {
                var container = document.querySelector(".chat-list-root");
                var scrollHeight = container.scrollHeight;
                if( container.scrollTop == ( scrollHeight - container.clientHeight ) || bForced ) {
                    this.isScroll = true;
                }
            },
            scrollToEnd: function() {
                var container = document.querySelector(".chat-list-root");
                var scrollHeight = container.scrollHeight;

                if( this.isScroll ) {
                    container.scrollTop = scrollHeight;
                    this.isScroll = false;
                }
            }
        },
        created: function () {
            
        },
        mounted: function() {
            const v = this;
            this.$bus.$on(P.SOCK.FlushChat, this.onFlushChat);            
            this.$bus.$on(P.SOCK.LoginRequest, function(packet) {
                v.nickname = packet.nick;
            });
            this.$bus.$on(P.Resize,this.onResize);            
            this.scrollToEnd();
        },
        updated: function() {
            const v = this;
            this.$nextTick(function(){
                v.scrollToEnd();
            });
        },
        components: {
        }
    }
</script>

<style>
</style>

<style scoped>
    #chat-wnd {
        position: relative;              
        height: 100%;        
    }

    .chat-list-root {        
        width: 100%;
        padding: 6px;
        overflow-y: auto;
        background-color: red;
    }

    .chat-list-root::-webkit-scrollbar {
        width: 10px;
    }

    .chat-list-root::-webkit-scrollbar-track {
        background-color: white;
    } /* the new scrollbar will have a flat appearance with the set background color */

    .chat-list-root::-webkit-scrollbar-thumb {
        background-color: #f27173;
    } /* this will style the thumb, ignoring the track */

    .chat-list-root::-webkit-scrollbar-button {
        background-color: #cc5050;
    } /* optionally, you can style the top and the bottom buttons (left and right for horizontal bars) */

    .chat-list-root::-webkit-scrollbar-corner {
        background-color: #cc5050;
    } /* if both the vertical and the horizontal bars appear, then perhaps the right bottom corner also needs to be styled */

    .chat-item {
        min-height: 30px;
        font-size: 12px;
    }

    .chat-input-root {
        height: 40px;
    }

    .left-item {
        float: left;
    }

    .nick-area {
        width: 80px;
        height: inherit;
        line-height: 40px;
        text-align: center;
        padding: 2px;
        background-color: whitesmoke;
        font-size: 14px;
    }

    .msg {
        margin-top: 3px;
        width: calc( 100% - 80px );
    }

    .ip-msg {
        height: 36px;
        width: 100%;
        border: none;
    }

    .btn {
        cursor: pointer;
    }

    .chatMobileTop {
        border-top: 1px solid lightgray;
    }

</style>