import axios from 'axios';

export default {
  install(Vue, { cdn }) {
    if (!axios) {
      return;
    }

    const loader = {
      loadImageAuto(url, callback = null) {
        return this.loadImage(url, callback ? {} : {
          onDownloadProgress: callback,
        });
      },

      async loadImage(url, config) {
        const res = await this.getBlobByUrl(`${cdn}/${url}`, config);
        const data = typeof res.data === 'string' ? res.data : URL.createObjectURL(res.data);

        return {
          data,
          size: res.data.size || Infinity,
          duration: res.duration,
        };
      },

      getBlobByUrl(url, config = {}) {
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
