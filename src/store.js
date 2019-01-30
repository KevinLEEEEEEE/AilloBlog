import Vue from 'vue';
import Vuex from 'vuex';

if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex);
}

const theme = {
  day: 'day',
  night: 'night',
  source: {
    token: null,
    cancel: null,
  },
};

export default new Vuex.Store({
  state: {
    theme: theme.day,
  },
  mutations: {
    themeToDay() {
      this.state.theme = theme.day;
    },

    themeToNight() {
      this.state.theme = theme.night;
    },
  },
  actions: {

  },
});
