import VueRouter from 'vue-router';

let routes = [
  {
    path: '/',
    component: { template: '<home></home>' }
  },

  {
    path: '/:id',
    component: { template: '<detail></detail>'}
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});
