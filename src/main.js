/* eslint-disable import/prefer-default-export */
/* eslint-disable no-new */
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';
import Routes from './routes';


// Use packages

Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(VueRouter);


// Register routes
const router = new VueRouter({
  routes: Routes,
});


export const bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#calendar');

// calendar stuff
Vue.config.productionTip = false;
