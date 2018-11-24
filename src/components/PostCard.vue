<template>
    <div class="contents-item" :style="styleObject">
        <h3>[{{getTypeString()}}] {{title}}</h3>
        <h5>{{regdate}}</h5>
        <div class="desc" v-html="desc">
        </div>
    </div>
</template>

<script>
    import DataList from './DataList.vue';

    export default {
        data: function() {
            return {
                styleObject: {
                    backgroundColor: "gray",
                    border:"4px solid red"
                }
            }
        },
        props: ['title', 'regdate', 'desc', 'type'],
        components: {
            'data-list': DataList
        },
        methods: {
            getTypeString: function() {
                switch( this.type ) {
                    case 0: this.styleObject.backgroundColor = "yellow"; return "자동";
                    case 1: return "이벤트 퀴즈";
                    default:
                        return "임시";
                }
            }
        }
    }
</script>

<style>
    .contents-item {
        position: relative;
        height: auto;
        margin: 8px 0;
        width: 50%;
        left: 25%;
        border-radius: 5px;
    }

    .contents-item h3,h5 {
        border-radius: inherit;
        background-color: inherit;
        padding: 4px;
    }
</style>

<style scoped>
    .desc {
        margin: 10px;
        padding: 10px;
        background-color: inherit;
    }
</style>