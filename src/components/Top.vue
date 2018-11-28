<template>
    <div class="top">
        <title-area></title-area>
        <div class="menu-btn-area">
            <button @click="onBtnOpenMenu">메뉴</button>
        </div>
    </div>
</template>

<script>
    import LogoArea from './LogoArea.vue';
    import TopTitle from './TopTitle.vue';

    export default {
        data: function () {
            return {};
        },
        components: {
            'logo-area': LogoArea,
            'title-area': TopTitle
        },
        methods: {
            onBtnOpenMenu: function(e) {
                this.$bus.$emit("openInventory", "");
            }
        }
    }
</script>

<style>
    .top {
        width: 100%;
        height: 300px;
        background-color: #3e58a7;
    }
</style>
<style scoped>
    .menu-btn-area {
        position: absolute;
        right: 8px;
        top: 8px;
    }

    button {
        width: 100px;
        height: 50px;
    }
</style>