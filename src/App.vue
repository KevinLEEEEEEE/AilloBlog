<template>
  <router-view id="app"/>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
@import './css/globalAnim.css';

#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

a {
  text-decoration: none;
}
</style>
