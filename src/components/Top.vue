<template>
    <div class="top">
        <logo-area></logo-area>
    </div>
</template>

<script>
    import LogoArea from './LogoArea.vue';

    export default {
        data: function () {
            return {};
        },
        components: {
            'logo-area': LogoArea
        }
    }
</script>

<style>
    .top {
        width: 100%;
        height: 45px;
        background-color: red;
    }
</style>