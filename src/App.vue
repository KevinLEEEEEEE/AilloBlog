<template>
  <router-view id="app"/>
</template>

<script>
export default {
  name: 'app',

  watch: {
    '$store.state.bodyScroll': function callback(to) {
      if (to) {
        document.body.classList.remove('preventScroll');
      } else {
        document.body.classList.add('preventScroll');
      }
    },
  },
};
</script>

<style>
@import './css/globalAnim.css';

#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
