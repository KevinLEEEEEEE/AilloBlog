<template>
  <div class="home">
    <blog-header></blog-header>
    <div class="welcome" :style="style" ref="welcome">
    </div>
    <div class="latestwork">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';

export default {
  name: 'home',
  components: { BlogHeader, BlogFooter },
  data() {
    return {
      heights: 100,
    };
  },

  computed: {
    style() {
      return {
        height: `${this.heights}px`,
      };
    },
  },

  mounted() {
    const availHeight = window.innerHeight;
    const rect = this.$refs.welcome.getBoundingClientRect();

    this.heights = availHeight - rect.top - 50;
  },
};
</script>

<style scoped>
.welcome {
  height: 90vh;
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-position-x: center;
}

.latestwork {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4px;
  height: 280px;
  padding: 4px 0;
}

.latestwork div {
  background: gray;
}
</style>
