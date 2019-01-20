<template>
  <header>
    <h1>
      <router-link to="/">Aillo's Blog</router-link>
    </h1>

    <nav>
      <router-link class="bgscale_anim link" to="/catalog/notes/1">札记</router-link> ·
      <router-link class="bgscale_anim link" to="/catalog/informal-essays/1">随笔</router-link> ·
      <a class="bgscale_anim link" href="https://github.com/KevinLEEEEEEE" target="_blank">编程作品集</a> ·
      <router-link class="bgscale_anim link" to="/">影像年鉴</router-link> ·
      <router-link class="bgscale_anim link" to="/">设计</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'blog-header',
};
</script>


<style scoped>
@import '../css/globalAnim.css';

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 18% 3rem 18%;
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

h1 a {
  color: rgb(30, 30, 30);
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
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

.link {
  margin: 0 1rem;
  padding: 0.2rem 0.1rem;
  font-size: .85rem;
  letter-spacing: 1px;
}

@media screen and (max-width: 567px) {
  .link {
    margin: 0;
    padding: 0;
    line-height: 15px;
  }
}

.link:last-of-type {
  margin-right: 0;
}

a {
  text-decoration: none;
  color: black;
}
</style>
