/**
 * Created by nnnyyy on 2018-11-21.
 */
import './css/style.css'
import Vue from 'vue'
import App from './App.vue'
import Login from './login.vue'
import Statistics from './statistics.vue'
import $ from 'jquery'
import axios from 'axios';

const NotFound = { template: '<p>페이지가 존재하지 않습니다.</p>'}

const routes = {
    '/': App,
    '/statistics': Statistics,
    '/login/': Login,
    '/login': Login
}

$(document).ready(function() {
    Vue.prototype.$bus = new Vue();
    Vue.prototype.$http = axios;

    new Vue({
        el: '#app',
        data: {
            currentRoute: window.location.pathname
        },
        computed: {
            ViewComponent() {
                return routes[this.currentRoute] || NotFound
            }
        },
        render: function(h) {
            return h( this.ViewComponent );
        }
    });
});
