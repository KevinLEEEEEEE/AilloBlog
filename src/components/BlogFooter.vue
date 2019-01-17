<template>
  <footer>
    <div class="link_container">
      <a class="link_item" href="https://github.com/KevinLEEEEEEE" target="_blank">
        <img src="../assets/github.png" alt="github">
      </a>
      <a class="link_item" href="https://space.bilibili.com/5392441?" target="_blank">
        <img src="../assets/bilibili.png" alt="bilibili">
      </a>
      <a class="link_item" href="https://music.163.com/#/user/home?id=14617530" target="_blank">
        <img src="../assets/music.png" alt="music">
      </a>
    </div>
    <a href="http://www.miibeian.gov.cn/">浙ICP备17041642号-1</a>
  </footer>
</template>

<script>
export default {
  name: 'blog-footer',
};
</script>


<style scoped>
footer {
  clear: both;
  background-color: rgb(230, 230, 230);
}

footer a {
  color: gray;
  text-decoration: none;
  font-size: 0.8rem;
  line-height: 2rem;
}

.link_container {
  padding: 60px 0 100px 0;
}

@media screen and (max-width: 567px) {
  .link_container {
    padding: 50px 0 80px 0;
  }
}

.link_item {
  display: inline-block;
  width: 60px;
  height: 60px;
  filter: opacity(40%);
  transform: scale(0.8);
  transition: filter 0.2s ease;
}

.link_item:not(:first-of-type) {
  margin-left: 25px;
}

@media screen and (max-width: 567px) {
  .link_item {
    display: block;
    margin: 10px auto !important;
  }
}

.link_item:hover {
  filter: opacity(70%);
}
</style>
