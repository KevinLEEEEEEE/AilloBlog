// @ts-check

export default {
  install(Vue, Showdown) {
    if (!Showdown) {
      return;
    }

    const converter = new Showdown.Converter();

    Vue.prototype.$md2html = text => converter.makeHtml(text);
  },
};
