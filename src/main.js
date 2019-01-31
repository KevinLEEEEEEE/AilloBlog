import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vueAxios from './plugins/vue-axios/index';
import vueLazyload from './plugins/vue-lazyload/index';
import vueImageLoader from './plugins/vue-imgloader/index';
import mock from './api/mock/mock';

mock({
  Homepage: false,
  Notes: false,
  InformalEssays: false,
  Photographs: false,
  Designs: false,
  PhotoContents: false,
  Markdown: false,
  Image: false,
});

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

window.addEventListener('unhandledrejection', (event) => {
  console.warn(`WARNING: Unhandled promise rejection. Reason: ${event.reason}`);
});
