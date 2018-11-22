<template>
    <div>
        <top-bar></top-bar>
        <contents></contents>
    </div>
</template>

<script>
    import Top from './components/Top.vue';
    import Contents from './components/Contents.vue';

    export default {
        components: {
            'top-bar': Top,
            'contents': Contents
        }
    }
</script>

<style>
</style>