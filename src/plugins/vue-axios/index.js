import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() };

  return config;
}, err => Promise.reject(err));

axios.interceptors.response.use((response) => {
  response.config.metadata.endTime = new Date();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;

  return response;
}, err => Promise.reject(err));

export default {
  install(Vue) {
    if (!axios) {
      return;
    }

    Vue.prototype.$axios = axios;

    Vue.prototype.$http = axios;
  },
};
