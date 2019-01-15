<template>
  <div>
    <blog-header></blog-header>

    <div class="reader_container">
      <p @click="back">
        return
      </p>
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
  name: 'notes-reader',
  components: { MdReader, BlogHeader, BlogFooter },
  data() {
    return {
      filename: '',
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    resetScrollPosition() {
      document.body.scrollTop = 0;
    },
  },

  beforeMount() {
    const { route, filename } = this.$route.params;

    this.filename = `${route}/${filename}`;

    this.resetScrollPosition();
  },
};
</script>

<style scoped>
.reader_container {
  margin: 0 18%;
  text-align: start;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .reader_container {
    margin: 0 14%;
  }
}

@media screen and (max-width: 567px) {
  .reader_container {
    margin: 0 10%;
  }
}
</style>
