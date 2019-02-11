<template>
  <div :class="`viewer-${theme}-theme`">
    <blog-header :theme="theme"></blog-header>

    <div class="viewer-container fadeandtranslatein">
      <image-parser
        :route="route"
        :name="filename"
        :theme="theme"
      ></image-parser>
      <div class="tool">
        <div class="tool-container" v-if="!isFontTool">
          <a @click="back" class="tool-btn return-btn">←</a>
          <a @click="top" class="tool-btn top-btn">↑</a>
        </div>
      </div>
    </div>

    <blog-footer :theme="theme"></blog-footer>
  </div>
</template>

<script>
import ImageParser from '../components/ImageParser.vue';
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';

export default {
  name: 'reader',
  components: {
    BlogHeader,
    BlogFooter,
    ImageParser,
  },
  props: {
    route: String,
    filename: String,
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    top() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style>
.viewer-day-theme {
  --tool-color: rgb(40, 40, 40);
}

.viewer-night-theme {
  --tool-color: rgb(220, 220, 220);
  background-color: rgb(18, 18, 18);
}
</style>
