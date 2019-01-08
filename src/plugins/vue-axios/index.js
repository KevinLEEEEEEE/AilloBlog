export default {
  install(Vue, axios) {
    if (!axios) {
      console.error('You have to install axios');

      return;
    }

    Vue.prototype.$axios = axios;
  },
};
