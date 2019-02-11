<template>
  <div :class="`reader-${theme}-theme`">
    <blog-header :theme="theme"></blog-header>

    <div class="reader-container fadeandtranslatein">
      <md-parser
        :filename="`${this.route}/${this.filename}`"
        :theme="theme"
      ></md-parser>
      <div class="tool">
        <div class="tool-container" v-if="isFontTool">
          <a @click="biggerfont" class="tool-btn bigger-font">A+</a>
          <a @click="smallerfont" class="tool-btn smaller-font">A-</a>
        </div>
        <div class="tool-container" v-if="!isFontTool">
          <a @click="back" class="tool-btn return-btn">←</a>
          <a @click="top" class="tool-btn top-btn">↑</a>
        </div>
        <a @click="setting" class="tool-btn setting-btn">A</a>
      </div>
    </div>

    <blog-footer :theme="theme"></blog-footer>
  </div>
</template>

<script>
import MdParser from '../components/MdParser.vue';
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';

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
  data() {
    return {
      io: null,
      fontSize: 16,
      isFontTool: false,
    };
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    },

    mdStyle() {
      return {
        'font-size': `${this.fontSize}px`,
      };
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

    biggerfont() {
      this.$store.commit('addFontSize');
    },

    smallerfont() {
      this.$store.commit('reduceFontSize');
    },

    setting() {
      this.isFontTool = !this.isFontTool;
    },
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
</style>
