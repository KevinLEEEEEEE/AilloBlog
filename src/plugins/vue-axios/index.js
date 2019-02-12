import axios from 'axios';

axios.interceptors.response.use(undefined, (err) => {
  const { config } = err;

  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  config.retryCount = config.retryCount || 0;

  if (config.retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.retryCount += 1;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  })
    .then(() => axios(config));
});

export default {
  install(Vue) {
    if (!axios) {
      return;
    }

    Vue.prototype.$axios = axios;

    Vue.prototype.$http = axios;
  },
};
