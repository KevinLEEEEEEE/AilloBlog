const network = (() => {
  const poolUtils = {
    pool: [],
    currIndex: 0,
    imageQuality: 75,

    add(size, duration) {
      this.pool[this.currIndex] = { size, duration };

      this.currIndex = (this.currIndex + 1) % 5;

      this.calculate();
    },

    calculate() {
      const sum = this.pool.reduce((prev, curr) => ({
        size: prev.size + curr.size,
        duration: prev.duration + curr.duration,
      }), { size: 0, duration: 0 });

      const ratio = sum.size / sum.duration;

      console.log(`network ratio: ${ratio}`);
    },
  };

  return {
    addNetworkInfo(size, duration) {
      poolUtils.add(size, duration);
    },

    getImageQuality() {
      return poolUtils.imageQuality;
    },
  };
})();


const lazyload = (() => {
  const loadEvent = new CustomEvent('loadFullImage');

  const emitLoadEvent = (node) => {
    node.dispatchEvent(loadEvent);
  };

  const io = new IntersectionObserver((changes) => {
    changes.forEach((change) => {
      if (change.intersectionRatio > 0) {
        const { target } = change;

        io.unobserve(target);

        emitLoadEvent(target);
      }
    });
  });

  return {
    register(node) {
      io.observe(node);
    },

    unregister(node) {
      io.unobserve(node);
    },
  };
})();

const smartImg = {
  lazyload,
  network,
};

export default smartImg;
