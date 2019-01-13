export default {
  install(Vue, axios, { cdn }) {
    if (!axios) {
      console.error('You have to install axios');

      return;
    }

    Vue.prototype.imageloader = {
      loadImageFromCDN(path, setting) {
        return Promise.resolve(`${cdn}/${path}?${setting}`);
      },

      loadImageFromLocal(path) {
        return new Promise((resolve, reject) => {
          axios.get(`${path}`, { responseType: 'blob' })
            .then((res) => {
              const reader = new FileReader();

              reader.onload = (e) => {
                resolve(e.target);
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
  },
};
