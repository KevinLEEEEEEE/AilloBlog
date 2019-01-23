<template>
  <header :class="[theme === 'day' ? 'header-day-theme' : 'header-night-theme']">
    <h1>
      <router-link class="title-link" to="/">Aillo's Blog</router-link>
    </h1>

    <nav>
      <router-link class="bgscale_anim nav-link" to="/catalog/notes/1">札记</router-link> ·
      <router-link class="bgscale_anim nav-link" to="/catalog/informal-essays/1">随笔</router-link> ·
      <a class="bgscale_anim nav-link" href="https://github.com/KevinLEEEEEEE" target="_blank">编程作品集</a> ·
      <router-link class="bgscale_anim nav-link" to="/catalog/photographs/1">影像年鉴</router-link> ·
      <router-link class="bgscale_anim nav-link" to="/catalog/designs/1">设计</router-link>
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
};
</script>

<style>
.header-night-theme {
  --nav-color: white;
  --bgscale-color: white;
  --title-color: rgb(240, 240, 240);
}

.header-day-theme {
  --nav-color: black;
  --bgscale-color: black;
  --title-color: rgb(30, 30, 30);
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 18% 3rem 18%;
}

@media screen and (max-width: 1024px) {
  header {
    flex-direction: column;
  }
}

header h1 {
  margin: 0;
  font-size: 2rem;
}

.title-link {
  color: var(--title-color);
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--nav-color);
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  nav {
    margin: 5% 0;
  }
}

@media screen and (max-width: 567px) {
  nav {
    flex-direction: column;
    margin-top: 8%;
  }
}

.nav-link {
  margin: 0 1rem;
  padding: 0.2rem 0.1rem;
  font-size: .85rem;
  letter-spacing: 1px;
  color: inherit;
}

@media screen and (max-width: 567px) {
  .nav-link {
    margin: 0;
    padding: 0;
    line-height: 15px;
  }
}

.nav-link:last-of-type {
  margin-right: 0;
}

a {
  text-decoration: none;
}
</style>
