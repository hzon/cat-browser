import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './routes';

Vue.use(VueRouter)

Vue.component('home', require('./components/Home.vue').default);
Vue.component('detail', require('./components/Detail.vue').default);

new Vue({
  el: '#app',

  router,

  render: h => h(App)
})
