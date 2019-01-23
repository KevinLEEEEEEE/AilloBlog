export default {
  install(Vue, axios, { cdn }) {
    if (!axios) {
      return;
    }

    const loader = {
      loadImageFromCDN(path, setting) {
        return this.loadImageByUrl(`${cdn}/${path}?${setting}`);
      },

      loadImageFromLocal(path) {
        return this.loadImageByUrl(path);
      },

      loadImageAuto(path, setting = '') {
        return process.env.NODE_ENV === 'production'
          ? loader.loadImageFromCDN(path, setting)
          : loader.loadImageFromLocal(path);
      },

      loadImageByUrl(url) {
        return new Promise((resolve, reject) => {
          axios.get(url, { responseType: 'blob' })
            .then((res) => {
              const reader = new FileReader();

              reader.onload = (e) => {
                resolve(e.target.result);
              };

              reader.onerror = (err) => {
                reject(err);
              };

              reader.readAsDataURL(res.data);
            }, (err) => {
              reject(err);
            });
        });
      },
    };

    Vue.prototype.$imageloader = loader;
  },
};
