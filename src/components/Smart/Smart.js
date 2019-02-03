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

const smart = {
  lazyload,
};

export default smart;
