import axios from 'axios';

let source = axios.CancelToken.source();

axios.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() };

  if (!Reflect.has(config, 'cancelToken')) {
    config.cancelToken = source.token;
  }

  return config;
}, err => Promise.reject(err));

axios.interceptors.response.use((response) => {
  response.config.metadata.endTime = new Date();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;

  return response;
}, err => Promise.reject(err));

const updateToken = () => {
  source = axios.CancelToken.source();
};

const cancelToken = () => {
  source.cancel();
};

axios.cancelAllRequest = () => {
  cancelToken();

  updateToken();
};

export default {
  install(Vue) {
    if (!axios) {
      return;
    }

    Vue.prototype.$axios = axios;

    Vue.prototype.$http = axios;
  },
};
