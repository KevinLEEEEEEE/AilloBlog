<template>
  <router-view id="app"/>
</template>

<script>
export default {
  name: 'app',

  watch: {
    '$store.state.bodyScroll': function callback(to, from) {
      if (to !== from) {
        document.documentElement.classList.toggle('preventScroll');
      }
    },
  },
};
</script>

<style>
@import './css/globalAnim.css';
@import './css/tomorrow-night.min.css';

#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 16px;
}

a {
  text-decoration: none;
}

.preventScroll {
  overflow: hidden;
}
</style>

<style lang="scss">
@import './sass/index.scss';
</style>
