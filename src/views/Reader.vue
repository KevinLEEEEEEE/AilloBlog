<template>
  <div>
    <blog-header></blog-header>

    <div class="reader_container fadeandtranslatein">
      <md-parser
        :filename="completeFilename"
      ></md-parser>
      <div class="tool_container">
        <a @click="back" class="tool_btn return_btn">←</a>
        <a @click="top" class="tool_btn top_btn">↑</a>
      </div>
    </div>

    <blog-footer></blog-footer>
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

<style scoped>
@import "../css/globalAnim.css";

.reader_container {
  min-height: calc(100vh - 100px);
  margin: 0 18% 100px 18%;
  text-align: start;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .reader_container {
    margin: 0 14% 100px 14%;
  }
}

@media screen and (max-width: 567px) {
  .reader_container {
    margin: 0 10% 50px 10%;
  }
}

.tool_container {
  margin-top: 60px;
  text-align: right;
}

.tool_btn {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  color: rgb(40, 40, 40);
  border: 2px rgb(40, 40, 40) solid;
  border-radius: 50%;
  transition: transform 0.2s ease;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.return_btn:hover {
  transform: translateX(-5px);
}

.top_btn:hover {
  transform: translateY(-5px);
}
</style>
