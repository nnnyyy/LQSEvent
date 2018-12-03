<template>
    <div id="contents" :style="{width: windowWidth + 'px'}">
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        data: function () {
            return {
                windowWidth: 800
            };
        },
        components: {},
        methods: {},
        created: function() {
            const v = this;
            $(window).resize(function() {
                if( window.innerWidth  >= 550 && window.innerWidth < 750 ) {
                    v.windowWidth = 500;
                }
                else if( window.innerWidth  >= 750 && window.innerWidth < 950 ) {
                    v.windowWidth = 700;
                }
                else if( window.innerWidth  >= 950 && window.innerWidth ) {
                    v.windowWidth = 900;
                }

            });
        }
    }
</script>

<style>
</style>
<style scoped>
    #contents  {
        height: 100%;
        margin: 0 auto;
    }
</style>