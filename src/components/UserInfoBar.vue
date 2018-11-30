<template>
    <div class="user-info-bar">
        <div class="icon item" v-show="logined">
            <img class="img-icon" :src="imageURL">
        </div>
        <div class="id item" v-show="logined">{{nick}}</div>
        <div class="id item" v-show="logined"> | </div>
        <div class="id item" v-show="logined">{{level}}레벨</div>
        <div class="id item" v-show="logined"> | </div>
        <div class="id item" v-show="logined">{{point}}점</div>
        <div class="id item" v-show="logined"> | </div>
        <div class="id item" v-show="logined"> {{comboCount}} 콤보</div>
        <div class="id item" v-show="logined"> | </div>
        <div class="id item" v-show="logined"><button @click="onBtnLogout">로그아웃</button></div>
    </div>
</template>

<script>
    import P from '../../common/protocol.js';
    import G from '../global';

    export default {
        data: function () {
            return {
               imageURL: '/images/star0.png',
                nick: '정보없음',
                level: 0,
                point: 0,
                comboCount: 0,
                logined: false
            };
        },
        components: {},
        methods: {
            setInfo: function( nick, level, point ) {
                this.nick = nick;
                this.level = level;
                this.imageURL = '/images/star'+ level +'.png'
                this.point = point;
                this.logined = true;
            },
            clear: function() {
                this.nick = 'noname';
                this.level = 0;
                this.imageURL = '/images/star'+ 0 +'.png'
                this.point = 0;
                this.logined = false;
            },
            onBtnLogout: function(e) {
                e.preventDefault();
                G.sendPacket(P.SOCK.Logout, {});
            }
        },
        created: function() {
            const v = this;
            this.clear();
            this.$bus.$on(P.SOCK.LoginRequest, function(info) {
                v.setInfo(info.nick, info.auth, info.point);
            });

            this.$bus.$on(P.SOCK.NotLogined, function(info) {
                v.clear();
            });

            this.$bus.$on(P.SOCK.ComboInfo, function( comboInfo ) {
                v.comboCount = comboInfo.cnt;
                v.point = comboInfo.point;
            });
        }
    }
</script>

<style>

</style>
<style scoped>
    .user-info-bar {
        width: 100%;
        height: 42px;
        background-color: #1e2a5d;
        border-bottom: 6px solid #334696;
    }

    .item {
        background-color: inherit;
        float: left;
    }

    .icon {
        width: 36px;
        height: 36px;
        margin-left: 16px;
    }

    .img-icon {
        width: inherit;
        height: inherit;
        background-color: inherit;
        padding: 4px;
    }

    .id {
        color: whitesmoke;
        line-height: 36px;
        margin-left: 8px;
    }
</style>