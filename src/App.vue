<template>
    <div id="main">
        <top-bar></top-bar>
        <contents></contents>
        <div v-if="!isMobile">
            <div style="width:980px;margin: 0 auto; position: absolute; bottom: 0; left: calc( 50% - 490px );">
                <div style="width: 320px; float: left">
                    <ins class="kakao_ad_area" style="display:none;width:100%"
                         data-ad-unit    = "DAN-t87e91n4i053"
                         data-ad-width   = "320"
                         data-ad-height  = "50"></ins>
                </div>
                <div style="width: 320px; float: left; margin-left:10px;">
                    <ins class="kakao_ad_area" style="display:none;width:100%"
                         data-ad-unit    = "DAN-uvjqvmlqkb3k"
                         data-ad-width   = "320"
                         data-ad-height  = "50"></ins>
                </div>
                <div style="width: 320px; float: left; margin-left:10px;">
                    <ins class="kakao_ad_area" style="display:none;width:100%"
                         data-ad-unit    = "DAN-rh5ikhi3t46a"
                         data-ad-width   = "320"
                         data-ad-height  = "50"></ins>
                </div>
            </div>
        </div>
        <div v-else style="margin: 20px 0 0 0">
            <div style="    width:320px;margin: 0 auto; ">
                <div style="width: 320px; float: left">
                    <ins class="kakao_ad_area" style="display:none;width:100%"
                         data-ad-unit    = "DAN-t87e91n4i053"
                         data-ad-width   = "320"
                         data-ad-height  = "50"></ins>
                </div>
            </div>
            <div style="width:320px;margin: 0 auto; ">
                <div style="width: 320px; float: left">
                    <ins class="kakao_ad_area" style="display:none;width:100%"
                         data-ad-unit    = "DAN-uvjqvmlqkb3k"
                         data-ad-width   = "320"
                         data-ad-height  = "50"></ins>
                </div>
            </div>
            <div style="width:320px;margin: 0 auto; ">
                <div style="width: 320px; float: left">
                    <ins class="kakao_ad_area" style="display:none;width:100%"
                         data-ad-unit    = "DAN-rh5ikhi3t46a"
                         data-ad-width   = "320"
                         data-ad-height  = "50"></ins>
                </div>
            </div>
        </div>

        <alert-wnd></alert-wnd>
        <cur-combo-rank></cur-combo-rank>
        <quiz-record-rank></quiz-record-rank>
    </div>
</template>

<script>
    import Top from './components/Top.vue';
    import Contents from './components/Contents.vue';
    import AlertWnd from './components/AlertWnd.vue';
    import CurrentComboRank from './components/CurrentComboRank.vue';
    import QuizRecordRank from './components/QuizRecordRank.vue';
    import G from './global';

    export default {
        data: function() {
            return {
                isMobile: G.isMobile()
            }
        },
        components: {
            'top-bar': Top,
            'contents': Contents,
            'alert-wnd': AlertWnd,
            'cur-combo-rank': G.isMobile() ? '' : CurrentComboRank,
            'quiz-record-rank': G.isMobile() ? '' : QuizRecordRank
        }
    }
</script>

<style>

</style>