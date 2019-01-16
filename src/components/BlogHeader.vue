<template>
  <header>
    <h1>
      <router-link to="/">Aillo's Blog</router-link>
    </h1>

    <nav>
      <router-link class="bgscale_anim" to="/notes/1">札记</router-link> ·
      <router-link class="bgscale_anim" to="/">编程作品集</router-link> ·
      <router-link class="bgscale_anim" to="/">影像年鉴</router-link> ·
      <router-link class="bgscale_anim" to="/">设计</router-link> ·
      <router-link class="bgscale_anim" to="/">杂谈</router-link>
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

nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1024px) {
  nav {
    margin: 5% 0;
  }
}

@media screen and (max-width: 567px) {
  nav {
    flex-direction: column;
  }
}

nav a {
  margin: 0 1rem;
  padding: 0.2rem 0.1rem;
  font-size: .85rem;
  letter-spacing: 1px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
