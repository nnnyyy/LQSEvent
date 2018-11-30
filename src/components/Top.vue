<template>
    <div class="top" :class="{topmobile: isMobile}">
        <user-info-bar></user-info-bar>
        <title-area></title-area>
    </div>
</template>

<script>
    import LogoArea from './LogoArea.vue';
    import TopTitle from './TopTitle.vue';
    import UserInfoBar from './UserInfoBar.vue';
    import G from '../global';

    export default {
        data: function () {
            return {
                isMobile: G.isMobile()
            };
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
</style>
<style scoped>
    .top {
        width: 100%;
        height: 250px;
        background-color: #3e58a7;
    }

    .menu-btn-area {
        position: absolute;
        right: 8px;
        top: 8px;
    }

    button {
        width: 100px;
        height: 50px;
    }

    .topmobile {
        height:  200px;
    }
</style>