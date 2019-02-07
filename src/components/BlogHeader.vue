<template>
  <header :class="`header-${theme}-theme`">
    <router-link class="title-link" to="/">Aillo's Blog</router-link>

    <nav>
      <router-link class="bgscale_anim nav-link" :to="getUrl('notes')">札记</router-link>
      <router-link class="bgscale_anim nav-link" :to="getUrl('informal-essays')">随笔</router-link>
      <a class="bgscale_anim nav-link" href="https://github.com/KevinLEEEEEEE" target="_blank" rel="noopener">编程作品集</a>
      <router-link class="bgscale_anim nav-link" :to="getUrl('photographs')">影像年鉴</router-link>
      <router-link class="bgscale_anim nav-link" :to="getUrl('designs')">设计</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'blog-header',
  props: {
    theme: {
      type: String,
      default: 'day',
    },
  },

  methods: {
    getUrl(category) {
      return {
        name: 'catalog',
        params: {
          category,
          page: '1',
        },
      };
    },
  },
};
</script>

<style>
  .header-day-theme {
    --nav-color: black;
    --bgscale-color: black;
    --title-color: rgb(30, 30, 30);
  }

  .header-night-theme {
    --nav-color: white;
    --bgscale-color: white;
    --title-color: rgb(240, 240, 240);
  }
</style>
