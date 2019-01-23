<template>
  <div :class="[theme === 'day' ? 'reader-day-theme' : 'reader-night-theme']">
    <blog-header :theme="theme"></blog-header>

    <div class="reader-container fadeandtranslatein">
      <md-parser
        :filename="completeFilename"
        :theme="theme"
      ></md-parser>
      <div class="tool-container">
        <a @click="back" class="tool-btn return-btn">←</a>
        <a @click="top" class="tool-btn top-btn">↑</a>
      </div>
    </div>

    <blog-footer :theme="theme"></blog-footer>
  </div>
</template>

<script>
import MdParser from '@/components/MdParser.vue';
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';

export default {
  name: 'reader',
  components: {
    MdParser,
    BlogHeader,
    BlogFooter,
  },
  props: {
    route: String,
    filename: String,
  },

  computed: {
    completeFilename() {
      return `${this.route}/${this.filename}`;
    },

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

    resetScroll() {
      window.scrollTo({
        top: 0,
      });
    },
  },

  beforeMount() {
    this.resetScroll();
  },
};
</script>

<style>
.reader-day-theme {
  --tool-color: rgb(40, 40, 40);
}

.reader-night-theme {
  --tool-color: rgb(220, 220, 220);
  background-color: rgb(18, 18, 18);
}

.reader-container {
  min-height: calc(100vh - 100px);
  margin: 0 18% 100px 18%;
  text-align: start;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .reader-container {
    margin: 0 14% 100px 14%;
  }
}

@media screen and (max-width: 567px) {
  .reader-container {
    margin: 0 10% 50px 10%;
  }
}

.tool-container {
  margin-top: 60px;
  text-align: right;
}

.tool-btn {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  color: var(--tool-color);
  border: 1.6px var(--tool-color) solid;
  border-radius: 50%;
  transition: transform 0.2s ease;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.return-btn:hover {
  transform: translateX(-5px);
}

.top-btn:hover {
  transform: translateY(-5px);
}
</style>
