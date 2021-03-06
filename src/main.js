import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vueAxios from './plugins/vue-axios/index';
import vueLazyload from './plugins/vue-lazyload/index';
import vueImageLoader from './plugins/vue-imgloader/index';

// import mock from './api/mock/mock';

// mock({
//   Pages: true,
//   Contents: true,
//   Markdown: true,
//   Images: false,
// });

axios.defaults.timeout = 6000;

axios.defaults.retry = 4;

axios.defaults.retryDelay = 500;

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://www.lucario.cn'
  : 'y';

Vue.config.productionTip = false;

Vue.use(vueLazyload);

Vue.use(vueAxios);

Vue.use(vueImageLoader, {
  cdn: 'http://cdn.lucario.cn',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
