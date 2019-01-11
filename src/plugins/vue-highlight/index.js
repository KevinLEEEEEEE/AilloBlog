export default {
  install(Vue, hljs) {
    if (!hljs) {
      console.error('You have to install highlight');

      return;
    }

    Vue.prototype.$highlight = hljs;
  },
};
