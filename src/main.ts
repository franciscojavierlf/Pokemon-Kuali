import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;
router.currentRoute.query
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
