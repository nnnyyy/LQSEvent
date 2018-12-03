/**
 * Created by nnnyyy on 2018-11-21.
 */
import './css/style.css'
import Vue from 'vue'
import App from './App.vue'
import Statistics from './statistics.vue'
import $ from 'jquery'
import _ from 'lodash'
import G from './global.js'

const NotFound = { template: '<p>페이지가 존재하지 않습니다.</p>'}

const routes = {
    '/': App,
    '/statistics': Statistics
}

$(document).ready(function() {
    Vue.prototype.$bus = new Vue();

    new Vue({
        el: '#app',
        data: {
            currentRoute: window.location.pathname
        },
        computed: {
            ViewComponent() {
                //  메인일 경우만 Global Socket 연결
                if( this.currentRoute === '/')
                    G.connectSocket();

                return routes[this.currentRoute] || NotFound
            }
        },
        render: function(h) {
            return h( this.ViewComponent );
        }
    });
});
