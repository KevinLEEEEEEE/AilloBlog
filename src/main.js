import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vueAxios from './plugins/vue-axios/index';

Vue.use(vueAxios, axios);

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3001';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
