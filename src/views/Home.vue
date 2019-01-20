<template>
  <div class="home">
    <blog-header class="head"></blog-header>

    <div class="welcome fadein">
      <div class="big ball"></div>
      <div class="middle ball"></div>
      <div class="small ball"></div>
      <p class="welcometitle">Welcome!</p>
      <p class="welcometext">JUST A TINY BLOG FOR AILLO <span>(￣︶￣)</span></p>
    </div>

    <ul class="info_container">
      <li class="item_container" v-for="homepage in homepageList" :key="homepage.id">
        <homepage-poster class="item"
          :title="homepage.title"
          :route="`${homepagePath}/${homepage.folder}`"
          :filename="homepage.filename"
          :covername="homepage.covername"
        ></homepage-poster>
      </li>
    </ul>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';
import HomepagePoster from '@/components/HomepagePoster.vue';

export default {
  name: 'home',
  components: {
    BlogHeader,
    BlogFooter,
    HomepagePoster,
  },
  data() {
    return {
      homepagePath: '/',
      homepageList: [],
    };
  },

  methods: {
    initHomePage(data) {
      if (this.isValidHomePage(data)) {
        this.homepageList = data.homepages;

        this.homepagePath = data.path;
      }
    },

    isValidHomePage(obj) {
      return Reflect.has(obj, 'homepages') && Reflect.has(obj, 'path');
    },
  },

  mounted() {
    this.$http.get('blog/homepage.json')
      .then((res) => {
        this.initHomePage(res.data);
      });
  },
};
</script>

<style scoped>
@import '../css/globalAnim.css';
@import '../css/ballAnim.css';

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
  font-size: 1vw;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .welcome {
    font-size: 1.5vw;
  }
}

@media screen and (max-width: 567px) {
  .welcome {
    font-size: 2vw;
  }
}

.welcometitle {
  margin: 0;
  font-size: 8em;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.8);
}

.welcometext {
  margin: 0;
  font-size: 1.1em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .welcometext {
    font-size: 1.3em;
  }
}

@media screen and (max-width: 567px) {
  .welcometext {
    font-size: 1.5em;
  }
}

.welcometext span {
  font-size: 0.8em;
  vertical-align: top;
}

.info_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;
  margin: 4px 0;
  padding: 0;
}

@media screen and (max-width: 1024px) {
  .info_container {
    grid-template-columns: 1fr;
  }
}

.item_container {
  min-width: 0;
  list-style: none;
}

</style>
