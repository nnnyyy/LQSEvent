<template>
    <div id="main">
        <top-bar></top-bar>
        <contents></contents>
        <alert-wnd></alert-wnd>
    </div>
</template>

<script>
    import Top from './components/Top.vue';
    import Contents from './components/Contents.vue';
    import AlertWnd from './components/AlertWnd.vue';

    export default {
        components: {
            'top-bar': Top,
            'contents': Contents,
            'alert-wnd': AlertWnd
        }
    }
</script>

<style>

</style>