export default {
  install(Vue, axios, { cdn }) {
    if (!axios) {
      return;
    }

    const loader = {
      loadImageFromCDN(path, setting, callback) {
        return this.loadImageByUrl(`${cdn}/${path}?${setting}`, callback);
      },

      loadImageFromLocal(path, callback) {
        return this.loadImageByUrl(path, callback);
      },

      loadImageAuto(path, setting) {
        return this.loadImageAutoWithProgress(path, setting, null);
      },

      loadImageAutoWithProgress(path, setting = '', callback) {
        return process.env.NODE_ENV === 'production'
          ? loader.loadImageFromCDN(path, setting, callback)
          : loader.loadImageFromLocal(path, callback);
      },

      loadImageByUrl(url, callback) {
        const config = callback ? {
          responseType: 'blob',
          onDownloadProgress: callback,
        } : { responseType: 'blob' };

        return new Promise((resolve, reject) => {
          axios.get(url, config)
            .then((res) => {
              const reader = new FileReader();

              reader.onload = (e) => {
                resolve({
                  data: e.target.result,
                  size: res.data.size,
                  duration: res.duration,
                });
              };

              reader.onerror = (err) => {
                reader.abort();

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
