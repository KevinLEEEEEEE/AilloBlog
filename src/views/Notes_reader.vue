<template>
  <div class="reader_container">
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
      const frag = document.getElementsByClassName('reader_container')[0];
      const html = this.$md2html(data);

      this.rawHtml = this.$transTextForLazyload(html);

      this.$nextTick(() => {
        this.highlightCodeInHtml();

        this.$lazyload(frag);
      });
    },

    highlightCodeInHtml() {
      const blocks = document.querySelectorAll('pre');

      blocks.forEach((block) => {
        this.$highlight.highlightBlock(block);
      });
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
  margin: 0 25%;
  text-align: start;
}

.reader_content {
  letter-spacing: 0.05rem;
}

.reader_content >>> hr {
  border: none;
  border-bottom: 1px solid rgb(210, 210, 210);
}

.reader_content >>> h1, .reader_content >>> h2, .reader_content >>> h3,
.reader_content >>> h4, .reader_content >>> h5, .reader_content >>> h6 {
  color: rgb(50, 50, 50);
  line-height: 3rem;
}

.reader_content >>> p {
  color: rgb(50, 50, 50);
  font-size: 0.9rem;
  line-height: 1.5rem;
}

.reader_content >>> li {
  font-size: 0.8rem;
  line-height: 1.5rem;
}

.reader_content >>> pre {
  padding: 20px 30px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.3rem;
}

.reader_content >>> a {
  color: rgb(30, 143, 172);
  text-decoration: none;
}

.reader_content >>> a:hover {
  text-decoration: underline;
}

.reader_content >>> blockquote {
  margin: 0;
  padding: 1rem 2rem;
  background: linear-gradient(to right, rgb(170, 170, 170) 4px, rgb(240, 240, 240) 4px);
}

.reader_content >>> img {
  width: 100%;
  height: 100%;
}

</style>
