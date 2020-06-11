import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './routes'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(axios)
Vue.prototype.$axios = axios;

Vue.component('home', require('./components/Home.vue').default);
Vue.component('detail', require('./components/Detail.vue').default);

new Vue({
  el: '#app',

  router,

  render: h => h(App)
})
