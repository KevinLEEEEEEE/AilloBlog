<template>
  <footer :class="[theme === 'day' ? 'footer-day-theme' : 'footer-night-theme']">
    <div class="footer-info-container">
      <div class="footer-info">
        <p>LINKS</p>
        <span><a href="https://music.163.com/#/user/home?id=14617530" target="_blank">NetEase Cloud Music</a></span>
        <span><a href="http://tieba.baidu.com/home/main?un=Hiccup希卡普" target="_blank">Baidu Tieba</a></span>
        <span><a href="https://space.bilibili.com/5392441?" target="_blank">Bilibili</a></span>
      </div>
      <div class="footer-info">
        <p>CONTACT ME</p>
        <span>Email：<a href="https://mail.qq.com/" target="_blank">1069440019@qq.com</a></span>
        <span>Discord：1160817830</span>
      </div>
      <div class="footer-info">
        <p>VISIT ME</p>
        <span>The Door Of My Dormitory Always Open</span>
        <span>At QING Court 77 - 514</span>
      </div>
      <div class="footer-info">
        <p>SITE CREDITS</p>
        <span>Designed By Aillo</span>
        <span>Developed By Aillo</span>
        <span>Project On <a href="https://github.com/KevinLEEEEEEE/AilloBlog" target="_blank">Github</a></span>
      </div>
    </div>
    <a href="http://www.miibeian.gov.cn/" class="police-link">浙ICP备17041642号-1</a>
  </footer>
</template>

<script>
export default {
  name: 'blog-footer',
  props: {
    theme: {
      type: String,
      default: 'day',
    },
  },
};
</script>

<style>
.footer-day-theme {
  --title-color: rgb(30, 30, 30);
  --text-color: rgb(150, 150, 150);
  --text-hover-color: var(--title-color);
  --background-color: rgb(225, 225, 225);
}

.footer-night-theme {
  --title-color: white;
  --text-color: rgb(150, 150, 150);
  --text-hover-color: var(--title-color);
  --background-color: rgb(10, 10, 10);
}

footer {
  padding: 0 18%;
  background-color: var(--background-color);
}

.footer-info-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.3rem;
  padding: 30px 0 50px 0;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .footer-info-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 567px) {
  .footer-info-container {
    grid-template-columns: repeat(1, 1fr);
  }
}

.footer-info {
  text-align: left;
  color: var(--text-color);
  font-size: 0.7rem;
  line-height: 1.2rem;
}

.footer-info p {
  margin: 0 0 0.5rem 0;
  color: var(--title-color);
}

.footer-info span {
  display: block;
}

.footer-info a {
  color: inherit;
  transition: color 0.2s ease;
}

.footer-info a:hover {
  color: var(--text-hover-color);
}

.police-link {
  color: var(--text-color);
  font-size: 0.7rem;
  line-height: 2rem;
}

a {
  text-decoration: none;
}
</style>
