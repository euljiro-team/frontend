import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
//import axios from 'axios'

Vue.prototype.$http = axios


new Vue({
    el: '#app',
    router,
    vuetify,
    axios,
    render: h => h(App)
})
