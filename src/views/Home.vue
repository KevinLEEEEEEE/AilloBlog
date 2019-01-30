<template>
  <div class="home">
    <blog-header :theme="theme" class="head"></blog-header>

    <div :class="`home-${theme}-theme`">
      <div class="welcome fadein">
        <div class="big ball"></div>
        <div class="middle ball"></div>
        <div class="small ball"></div>
        <p class="welcome-title">Welcome!</p>
        <p class="welcome-text">JUST A TINY BLOG FOR AILLO <span>(￣︶￣)</span></p>
      </div>

      <ul class="info-container">
        <li class="item-container" v-for="homepage in list" :key="homepage.objectId">
          <homepage-poster
            :title="homepage.title"
            :route="`${path}/${homepage.folder}`"
            :filename="homepage.filename"
            :covername="homepage.covername"
            :routename="homepage.routename"
          ></homepage-poster>
        </li>
      </ul>
    </div>

    <blog-footer :theme="theme"></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';
import HomepagePoster from '../components/HomepagePoster.vue';
import api from '../api/api';

export default {
  name: 'home',
  components: {
    BlogHeader,
    BlogFooter,
    HomepagePoster,
  },
  data() {
    return {
      path: '/',
      list: [],
    };
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },

  methods: {
    initHomePage(data) {
      this.list = data;

      this.path = 'blog/homepage';
    },
  },

  created() {
    api.homepage.getList()
      .then((res) => {
        console.log(res);
        this.initHomePage(res);
      });
  },
};
</script>

<style>
@import '../css/ballAnim.css';

.home-day-theme {
  --title-color: rgba(0, 0, 0, 0.8);
  --text-color: rgba(0, 0, 0, 0.5);
  --background-color: transparent;
  --ball-big-start-color: rgba(0, 0, 0, 0.01);
  --ball-big-end-color: rgba(0, 0, 0, 0.05);
  --ball-middle-start-color: rgba(0, 0, 0, 0.03);
  --ball-middle-end-color: rgba(0, 0, 0, 0.1);
  --ball-small-start-color: rgba(0, 0, 0, 0.06);
  --ball-small-end-color: rgba(0, 0, 0, 0.15);
}

.home-night-theme {
  --title-color: rgba(255, 255, 255, 0.9);
  --text-color: rgba(255, 255, 255, 0.6);
  --background-color: rgb(18, 18, 18);
  --ball-big-start-color: rgba(255, 255, 255, 0.01);
  --ball-big-end-color: rgba(255, 255, 255, 0.08);
  --ball-middle-start-color: rgba(255, 255, 255, 0.03);
  --ball-middle-end-color: rgba(255, 255, 255, 0.1);
  --ball-small-start-color: rgba(255, 255, 255, 0.06);
  --ball-small-end-color: rgba(255, 255, 255, 0.15);
}

.head {
  position: absolute;
  width: 64%;
  z-index: 2;
}

.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  overflow: hidden;
  font-size: 1.5rem;
  background-color: var(--background-color);
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .welcome {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .welcome {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 567px) {
  .welcome {
    font-size: 0.5rem;
  }
}

.welcome-title {
  margin: 0;
  font-size: 7em;
  font-weight: 900;
  color: var(--title-color);
}

.welcome-text {
  margin: 0;
  font-size: 1.1em;
  font-weight: 700;
  color: var(--text-color);
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .welcome-text {
    font-size: 1.3em;
  }
}

@media screen and (max-width: 567px) {
  .welcome-text {
    font-size: 1.5em;
  }
}

.welcome-text span {
  font-size: 0.8em;
  vertical-align: top;
}

.info-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;
  margin: 0;
  padding: 4px 0;
  background-color: var(--background-color);
}

@media screen and (max-width: 1024px) {
  .info-container {
    grid-template-columns: 1fr;
  }
}

.item-container {
  min-width: 0;
  list-style: none;
}
</style>
