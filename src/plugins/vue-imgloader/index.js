import axios from 'axios';

export default {
  install(Vue, { cdn }) {
    if (!axios) {
      return;
    }

    const loader = {
      /**
       * @param {String} url the url will auto add the cdn path
       * @param {Object} config
       * @returns {Object} data
       */
      async loadImage(url, config = {}) {
        const res = await this.getBlobByUrl(`${cdn}/${url}`, config);

        if (!res) {
          return {
            data: '',
            size: Infinity,
            duration: Infinity,
          };
        }

        const data = typeof res.data === 'string' ? res.data : URL.createObjectURL(res.data);

        return {
          data,
          size: res.data.size || Infinity,
          duration: res.duration,
        };
      },

      /**
       * @param {String} url the url will auto add the cdn path
       * @param {Object} config
       * @returns {Blob}
       */
      getBlobByUrl(url, config) {
        return axios.get(url, Object.assign({
          responseType: 'blob',
        }, config), {
          timeout: 6000,
        })
          .catch((thrown) => {
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown);
            }
          });
      },
    };

    Vue.prototype.$imageloader = loader;
  },
};
