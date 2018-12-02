<template>
    <div id="combo-rank">
        <div id="combo-rank-inner">
            <h4 style="text-align: center; padding: 6px 4px; background-color: whitesmoke; border-bottom: gray 2px solid;
                border-top-right-radius: 10px;">실시간 콤보 랭킹</h4>
            <div v-if="items.length > 0">
                <table style="width: 100%; margin: 4px; text-align: center;">
                    <template v-for="item in items">
                        <tr>
                            <td><img :src="getImageSrc(item.level)" style="height: 24px;"/></td>
                            <td style="width: 40%; height: 30px;">{{item.nick}}</td>
                            <td>{{item.quizCombo}}콤보</td>
                        </tr>
                    </template>
                </table>
            </div>
            <div v-else>
                <div style="text-align: center;margin: 20px;">데이터가 없습니다</div>
            </div>
        </div>
    </div>
</template>

<script>
    import G from '../global';
    import P from '../../common/protocol';

    export default {
        data: function () {
            return {
                items: []
            };
        },
        created:function() {
            this.$bus.$on(P.SOCK.CurrentComboRank, this.onCurrentComboRank);
        },
        methods: {
            onCurrentComboRank: function( packet ) {
                const v = this;
                v.items = packet.ranker;
            },
            getImageSrc: function( level ) {
                return '/images/star'+ level +'.png';
            }
        }
    }
</script>

<style>
</style>

<style scoped>
    * {
        background-color: transparent;
    }

    #combo-rank {
        position: absolute;
        left: 0;
        top: 110px;
        width: 200px;
        height: 220px;
        background-color: white;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        border: 2px gray solid;
    }

    #combo-rank-inner {
        background-color: transparent;
    }
</style>