<template>
  <footer>
    <div class="info_container">
      <div class="info">
        <p>LINKS</p>
        <span><a href="https://music.163.com/#/user/home?id=14617530" target="_blank">NetEase Cloud Music</a></span>
        <span><a href="http://tieba.baidu.com/home/main?un=Hiccup希卡普" target="_blank">Baidu Tieba</a></span>
        <span><a href="https://space.bilibili.com/5392441?" target="_blank">Bilibili</a></span>
      </div>
      <div class="info">
        <p>CONTACT ME</p>
        <span>Email：<a href="https://mail.qq.com/" target="_blank">1069440019@qq.com</a></span>
        <span>Discord：1160817830</span>
      </div>
      <div class="info">
        <p>VISIT ME</p>
        <span>The Door Of My Dormitory Always Open</span>
        <span>At QING Court 77 - 514</span>
      </div>
      <div class="info">
        <p>SITE CREDITS</p>
        <span>Designed By Aillo</span>
        <span>Developed By Aillo</span>
        <span>Project On <a href="https://github.com/KevinLEEEEEEE/AilloBlog" target="_blank">Github</a></span>
      </div>
    </div>
    <a href="http://www.miibeian.gov.cn/" class="police_link">浙ICP备17041642号-1</a>
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
  --basiccolor: rgb(150, 150, 150);
  --hovercolor: rgb(40, 40, 40);;
}

footer a {
  text-decoration: none;
}

.info_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.3rem;
  margin: 0 18% 30px 18%;
  padding: 30px 0 50px 0;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .info_container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 567px) {
  .info_container {
    grid-template-columns: repeat(1, 1fr);
  }
}

.info {
  text-align: left;
  color: var(--basiccolor);
  font-size: 0.7rem;
  line-height: 1.2rem;
}

.info p {
  margin: 0 0 0.5rem 0;
  color: var(--hovercolor);
}

.info span {
  display: block;
}

.info a {
  color: inherit;
  transition: color 0.2s ease;
}

.info a:hover {
  color: var(--hovercolor);
}

.police_link {
  color: var(--basiccolor);
  font-size: 0.7rem;
  line-height: 2rem;
}
</style>
