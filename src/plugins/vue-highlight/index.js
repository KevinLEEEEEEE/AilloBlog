export default {
  install(Vue, hljs) {
    if (!hljs) {
      return;
    }

    Vue.prototype.$highlight = hljs;
  },
};
