<template>
    <div class="top">
        <title-area></title-area>
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
        }
    }
</script>

<style>
    .top {
        width: 100%;
        height: 200px;
        background-color: #004444;
    }
</style>