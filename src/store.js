import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const theme = {
  day: 'day',
  night: 'night',
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
