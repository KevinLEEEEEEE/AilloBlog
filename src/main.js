import Vue from 'vue';
import axios from 'axios';
import Showdown from 'showdown';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/htmlbars';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import store from './store';
import vueAxios from './plugins/vue-axios/index';
import vueMd2html from './plugins/vue-md2html/index';
import vueHighlight from './plugins/vue-highlight/index';
import vueLazyload from './plugins/vue-lazyload/index';

Vue.use(vueLazyload);

Vue.use(vueAxios, axios);

Vue.use(vueMd2html, Showdown);

Vue.use(vueHighlight, hljs);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
});

Vue.config.productionTip = false;

// axios.defaults.baseURL = 'http://localhost:80';

axios.defaults.baseURL = 'http://pl73wegle.bkt.clouddn.com/blog';

hljs.registerLanguage('javascript', javascript);

hljs.registerLanguage('css', css);

hljs.registerLanguage('html', html);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
