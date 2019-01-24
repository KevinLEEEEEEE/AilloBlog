const diaplayImageAndDetachObserver = (io, change) => {
  if (change.intersectionRatio <= 0) {
    return;
  }

  console.log('load');

  const { target } = change;

  const src = target.getAttribute('data-src');

  target.setAttribute('src', src);

  io.unobserve(target);
};

let io = null;

function callback(changes) {
  changes.forEach((change) => {
    diaplayImageAndDetachObserver(io, change);
  });
}

io = new IntersectionObserver(callback);


export default {
  install(Vue) {
    /**
     * @param {DocumentFragment} frag
     */
    Vue.prototype.$lazyload = (frag) => {
      const imgs = frag.querySelectorAll('img.lazyload');

      imgs.forEach((img) => {
        io.observe(img);
      });
    };

    /**
     * @param {String} text
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
