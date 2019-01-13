<template>
  <div class="home">
    <blog-header></blog-header>
    <h1>Welcome to my blog</h1>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';

export default {
  name: 'home',
  components: { BlogHeader, BlogFooter },
};
</script>
