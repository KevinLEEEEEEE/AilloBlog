<template>
  <div class="home">
    <blog-header :theme="theme"></blog-header>

    <div class="forest" @mousemove.passive="forestMove" ref="forest">
      <p class="forest-text">I am Aillo</p>
      <img class="forest-musk" src="../assets/bgfront.png" alt="musk" :style="forestStyle">
    </div>

    <ul :class="[`home-${theme}-theme`, 'info-container']">
      <homepage-poster v-for="homepage in list" :key="homepage.objectId"
        :title="homepage.title"
        :route="`${path}/${homepage.folder}`"
        :filename="homepage.filename"
        :covername="homepage.covername"
        :routename="homepage.routename"
      ></homepage-poster>
    </ul>

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
      list: [],
      path: 'blog/homepage',
      scaleRatio: 1,
      forestRect: 0,
    };
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    },

    forestStyle() {
      return {
        transform: `scale(${this.scaleRatio})`,
      };
    },
  },

  methods: {
    initHomePage() {
      api.homepage.getList()
        .then((res) => {
          this.list = res;
        });
    },

    forestMove({ clientY }) {
      const yRatio = 1 - clientY / this.forestRect.height;

      this.scaleRatio = 1 + yRatio / 200;
    },

    updateForestSize() {
      this.forestRect = this.$refs.forest.getBoundingClientRect();
    },

    registerResizeEvent() {
      window.addEventListener('resize', this.updateForestSize);
    },

    unRegisterResizeEvent() {
      window.removeEventListener('resize', this.updateForestSize);
    },
  },

  mounted() {
    this.initHomePage();

    this.updateForestSize();

    this.registerResizeEvent();
  },

  beforeDestroy() {
    this.unRegisterResizeEvent();
  },
};
</script>

<style>
.home-day-theme {
  --background-color: transparent;
}

.home-night-theme {
  --background-color: rgb(18, 18, 18);
}
</style>
