export default {
  install(Vue, axios) {
    if (!axios) {
      return;
    }

    axios.interceptors.request.use((config) => {
      config.metadata = { startTime: new Date() };

      return config;
    }, err => Promise.reject(err));

    axios.interceptors.response.use((response) => {
      response.config.metadata.endTime = new Date();
      response.duration = response.config.metadata.endTime - response.config.metadata.startTime;

      return response;
    }, (err) => {
      err.config.metadata.endTime = Infinity;
      err.duration = Infinity;

      return Promise.reject(err);
    });

    Vue.prototype.$axios = axios;

    Vue.prototype.$http = axios;
  },
};
