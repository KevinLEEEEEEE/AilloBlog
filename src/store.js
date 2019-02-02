import Vue from 'vue';
import Vuex from 'vuex';

if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex);
}

const theme = {
  day: 'day',
  night: 'night',
};

export default new Vuex.Store({
  state: {
    theme: theme.day,
    bodyScroll: true,
  },
  mutations: {
    themeToDay() {
      this.state.theme = theme.day;
    },

    themeToNight() {
      this.state.theme = theme.night;
    },

    resetBodyScroll() {
      this.state.bodyScroll = true;
    },

    preventBodyScroll() {
      this.state.bodyScroll = false;
    },
  },
  actions: {

  },
});
