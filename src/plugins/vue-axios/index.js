export default {
  install(Vue, axios) {
    if (!axios) {
      return;
    }

    Vue.prototype.$axios = axios;

    Vue.prototype.$http = axios;
  },
};
