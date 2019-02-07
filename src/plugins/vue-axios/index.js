import axios from 'axios';

axios.defaults.timeout = 6000;

export default {
  install(Vue) {
    if (!axios) {
      return;
    }

    Vue.prototype.$axios = axios;

    Vue.prototype.$http = axios;
  },
};
