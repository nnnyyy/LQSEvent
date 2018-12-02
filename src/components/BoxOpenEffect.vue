<template>
    <div id="box-open-effect" v-show="visible">
        <div class="box-inner">
        </div>
        <img :src="imageSrc" class="box-img-style"/>
        <div class="gacha-name" :class="{namemove: isOpen}" >{{itemName}}</div>
    </div>
</template>

<script>
    import P from '../../common/protocol';

    export default {
        data: function () {
            return {
                imageSrc: '/images/box_closed.png',
                itemName: '아이템 이름',
                isOpen: false,
                visible: false
            };
        },
        created: function() {
            this.$bus.$on(P.OpenGachaBox, this.onOpenGachaBox);
        },
        methods: {
            setItemInfo: function( name ) {
                const v = this;
                v.visible = true;
                v.itemName = name;
                setTimeout(function(){
                    v.imageSrc = '/images/box_opened.png';
                    v.isOpen = true;
                    setTimeout(function() {
                        v.reset();
                    },3500);
                }, 1500);
            },
            onOpenGachaBox: function( info ) {
                this.setItemInfo(info.name);
            },
            reset: function() {
                this.visible = false;
                this.isOpen = false;
                this.imageSrc = '/images/box_closed.png';
            }
        }
    }
</script>

<style>
</style>

<style scoped>
    #box-open-effect {
        margin: 0;
        padding: 0;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.4);
        width: 100%;
        height: 100%;
    }

    .box-inner {
        background: rgba(0,0,0,0.4);
        width: 100%;
        height: 100%;
        opacity: 0.4;
    }

    .box-img-style {
        opacity: 1;
        width: 200px;
        background-color: transparent;
        position: absolute;
        left: calc(50% - 100px);
        top: calc(50% - 100px);
        cursor: pointer;
    }

    .gacha-name {
        opacity: 1;
        width: 300px;
        left: calc(50% - 135px);
        top: 38%;
        position:absolute;
        font-size: 25px;
        color: white;
        background-color: transparent;
        text-align: center;
        transition: 0.5s;
        opacity: 0;
    }

    .namemove {
        top: 30%;
        opacity: 1;
    }
</style>