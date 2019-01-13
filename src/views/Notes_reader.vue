<template>
  <div>
    <blog-header></blog-header>

    <div class="reader_container">
      <router-link to="/notes">
        return
      </router-link>
      <md-reader class="reader_content"
        :filename="filename"
      ></md-reader>
    </div>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import MdReader from '@/components/MdReader.vue';
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';

export default {
  name: 'notes_reader',
  components: { MdReader, BlogHeader, BlogFooter },
  data() {
    return {
      filename: '',
    };
  },

  beforeMount() {
    const { filename } = this.$route.params;

    this.filename = `blog/notes/${filename}/${filename}.md`;
  },
};
</script>

<style scoped>
.reader_container {
  margin: 0 25%;
  text-align: start;
}
</style>
