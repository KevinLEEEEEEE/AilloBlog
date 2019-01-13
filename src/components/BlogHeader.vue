<template>
  <header>
    <h1>
      <router-link to="/">Aillo's Blog</router-link>
    </h1>

    <nav>
      <router-link to="/notes">札记</router-link> ·
      <router-link to="/">编程作品集</router-link> ·
      <router-link to="/">影像年鉴</router-link> ·
      <router-link to="/">设计</router-link> ·
      <router-link to="/">杂谈</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'blog-header',
};
</script>


<style scoped>
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
}

header a {
  text-decoration: none;
  color: black;
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
  font-size: .85rem;
}

nav a:hover {
  border-bottom: solid 1px rgb(40, 40, 40);
  -webkit-transform: translateY(-1px);
  -moz-transform: translateY(-1px);
  -o-transform: translateY(-1px);
  transform: translateY(-1px);
}
</style>
