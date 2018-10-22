import Vue from 'vue';
import App from 'templates/index.vue';
import 'components/test-com.js';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from 'routes/index.js';
import stores from '../stores.js';
Vue.use(Vuex);
Vue.use(VueRouter);
const router = new VueRouter({
  routes
})
const store = new Vuex.Store(stores)
new Vue({
  router,
  ...App,
  store
}).$mount('#app')
