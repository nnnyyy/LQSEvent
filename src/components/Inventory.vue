<template>
    <div id="inventory" v-show="visible">
        <div>인벤토리</div>
        <ul class="list">
            <template v-for="item in inventory">
                <li>
                    <div>
                        {{item.name}} : {{item.cnt}}개
                    </div>
                </li>
            </template>
        </ul>
        <div class="bottom">
            <button @click="onCloseInventory">닫기</button>
        </div>
    </div>
</template>

<script>
    import P from '../../common/protocol';

    export default {
        data: function () {
            return {
                inventory: [
                    {name: '채팅 컬러 교환권', cnt: 20 },
                    {name: '채팅 스타일 교환권', cnt: 1 }
                ],
                visible: true
            };
        },
        methods: {
            onCloseInventory: function() {
                this.$bus.$emit(P.CloseInventory, "");
                this.$bus.$emit(P.StartTimer, "");
            }
        },
        created: function() {
            const v = this;
            this.$bus.$on(P.CloseInventory, function(data) {
                v.visible = false;
            });
        }
    }
</script>

<style>
</style>

<style scoped>
    #inventory {
        position: absolute;
        width: 400px;
        height: 100%;
        right: 0;
        top: 0;
    }

    #inventory .list {
        height: calc( 100% - 60px );
        background-color: red;
    }

    #inventory .bottom {
        height: 30px;
        background-color: yellow;
    }

    #inventory .bottom button {
        height: inherit;
    }
</style>