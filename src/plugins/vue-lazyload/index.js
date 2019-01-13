const diaplayImageAndDetachObserver = (io, change) => {
  if (change.intersectionRatio <= 0) {
    return;
  }

  const { target } = change;

  const src = target.getAttribute('data-src');

  target.setAttribute('src', src);
  target.setAttribute('data-src', '');

  io.unobserve(target);
};


export default {
  install(Vue) {
    /**
     * @param {DocumentFragment} frag
     */
    Vue.prototype.$lazyload = (frag) => {
      let io = null;
      const imgs = frag.querySelectorAll('img.lazyload');

      function callback(changes) {
        changes.forEach((change) => {
          diaplayImageAndDetachObserver(io, change);
        });
      }

      io = new IntersectionObserver(callback);

      imgs.forEach((img) => {
        io.observe(img);
      });
    };

    /**
     * @param {string} text
     */
    Vue.prototype.$transTextForLazyload = (text) => {
      const regexp = /<img src\s*=\s*"(.+?)"/g; // <img src="$1" ... >

      return text.replace(regexp, '<img class="lazyload" data-src="$1"');
    };

    /**
     * @param {DocumentFragment} frag
     */
    Vue.prototype.$transFragForLazyload = (frag) => {
      const imgs = frag.querySelectorAll('img.lazyload');

      imgs.forEach((img) => {
        const src = img.getAttribute('src');

        img.setAttribute('data-src', src);

        img.setAttribute('src', '');
      });
    };
  },
};
