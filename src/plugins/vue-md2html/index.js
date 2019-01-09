// @ts-check

export default {
  install(Vue, Showdown) {
    if (!Showdown) {
      console.error('You have to install showdown');

      return;
    }

    const converter = new Showdown.Converter();

    Vue.prototype.$md2html = (text) => converter.makeHtml(text);
  },
};
