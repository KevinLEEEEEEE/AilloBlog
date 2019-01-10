<template>
  <div class="reader_container">
    <pre class="prettyprint linenums lang-html">
      int x = foo();  /* This is a comment  <span class="nocode">This is not code</span>
        Continuation of comment */
      int y = bar();
    </pre>
    <div v-html="rawHtml" class="reader_content"></div>
  </div>
</template>

<script>
export default {
  name: 'blog',
  props: {
    id: String,
  },
  data() {
    return {
      rawHtml: '',
    };
  },

  methods: {
    updateHtmlByMd(data) {
      const html = this.$md2html(data);

      this.rawHtml = html;
    },
  },

  mounted() {
    const fileName = 'the-little-prince';

    this.$axios.get(`notes/${fileName}.md`)
      .then((res) => {
        this.updateHtmlByMd(res.data);
      });
  },
};
</script>

<style scoped>
.reader_container {
  margin: 0 18%;
  text-align: start;
}

.reader_content {
  letter-spacing: 0.05rem;
}

.reader_content >>> hr {
  border: 0.5px solid rgb(200, 200, 200);
}

.reader_content >>> h1, .reader_content >>> h2 {
  color: rgb(30, 30, 30);
  line-height: 3rem;
}

.reader_content >>> p {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.5rem;
}

.reader_content >>> li {
  font-size: 0.8rem;
  line-height: 1.5rem;
}

.reader_content >>> pre {
  position: relative;
  padding: 30px 20px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.3rem;
  color: white;
  background-color: rgb(40, 40, 40);
}

</style>
