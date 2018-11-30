<template>
    <div class="top">
        <user-info-bar></user-info-bar>
        <title-area></title-area>
    </div>
</template>

<script>
    import LogoArea from './LogoArea.vue';
    import TopTitle from './TopTitle.vue';
    import UserInfoBar from './UserInfoBar.vue';

    export default {
        data: function () {
            return {};
        },
        components: {
            'logo-area': LogoArea,
            'title-area': TopTitle,
            'user-info-bar': UserInfoBar
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