import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// if (process.env.NODE_ENV === 'development') {
//   Vue.use(Vuex);
// }

const theme = {
  day: 'day',
  night: 'night',
};

export default new Vuex.Store({
  state: {
    theme: theme.day,
    bodyScroll: true,
    markdown: {
      fontsize: 16,
    },
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

    addFontSize() {
      this.state.markdown.fontsize += 1;
    },

    reduceFontSize() {
      if (this.state.markdown.fontsize > 0) {
        this.state.markdown.fontsize -= 1;
      }
    },
  },
  actions: {

  },
});
