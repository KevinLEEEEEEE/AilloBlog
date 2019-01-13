<template>
  <div class="reader_container">
    <router-link
      to="/notes">
      return
    </router-link>
    <md-reader class="reader_content"
      :filename="filename"
    ></md-reader>
  </div>
</template>

<script>
import MdReader from '../components/MdReader.vue';

export default {
  name: 'notes_reader',
  components: { MdReader },
  data() {
    return {
      filename: '',
    };
  },

  beforeMount() {
    const { filename } = this.$route.params;

    this.filename = `/notes/${filename}/${filename}.md`;
  },
};
</script>

<style scoped>
.reader_container {
  margin: 0 25%;
  text-align: start;
}
</style>
