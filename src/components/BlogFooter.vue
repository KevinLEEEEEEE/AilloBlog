<template>
  <footer :class="`footer-${theme}-theme`">
    <div class="footer-info-container">
      <div class="footer-info">
        <p>LINKS</p>
        <span><a href="https://music.163.com/#/user/home?id=14617530" target="_blank"  rel="noopener">NetEase Cloud Music</a></span>
        <span><a href="http://tieba.baidu.com/home/main?un=Hiccup希卡普" target="_blank"  rel="noopener">Baidu Tieba</a></span>
        <span><a href="https://space.bilibili.com/5392441?" target="_blank"  rel="noopener">Bilibili</a></span>
      </div>
      <div class="footer-info">
        <p>CONTACT ME</p>
        <span>Email：<a href="https://mail.qq.com/" target="_blank"  rel="noopener">1069440019@qq.com</a></span>
        <span>Discord：1160817830</span>
        <span>Door Of 77-514 Always Opens</span>
      </div>
      <div class="footer-info">
        <p>SITE SETTING</p>
        <span>
          <img src="../assets/day-theme.png" alt="day-theme-icon" width="12" height="12">
          <a @click="themeToDay"> Day-theme</a>
        </span>
        <span class="theme-btn">
          <img src="../assets/night-theme.png" alt="day-theme-icon" width="10" height="10">
          <a @click="themeToNight"> Night-theme</a>
        </span>
      </div>
      <div class="footer-info">
        <p>SITE CREDITS</p>
        <span>Designed By Aillo</span>
        <span>Developed By Aillo</span>
        <span>Project On <a href="https://github.com/KevinLEEEEEEE/AilloBlog" target="_blank"  rel="noopener">Github</a></span>
      </div>
    </div>
    <a href="http://www.miibeian.gov.cn/" class="police-link"  rel="noopener">浙ICP备17041642号-1</a>
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

  methods: {
    themeToDay() {
      this.$store.commit('themeToDay');
    },

    themeToNight() {
      this.$store.commit('themeToNight');
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
  text-align: center;
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
  font-size: 0.75rem;
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
  cursor: pointer;
}

.footer-info a:hover {
  color: var(--text-hover-color);
}

.footer-info img {
  vertical-align: -1px;
}

.police-link {
  color: var(--text-color);
  font-size: 0.7rem;
  line-height: 2rem;
}
</style>
