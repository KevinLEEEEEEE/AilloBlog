<template>
  <div v-html="rawHtml" class="reader"></div>
</template>


<script>
export default {
  name: 'md-reader',
  props: {
    filename: String,
  },
  data() {
    return {
      rawHtml: '',
    };
  },

  methods: {
    updateHtmlByMd(data) {
      const frag = document.getElementsByClassName('reader')[0];
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
    this.$axios.get(`${this.filename}.md`)
      .then((res) => {
        console.log(`md-reader receive file: ${this.route}/${this.filename}.md.`);

        this.updateHtmlByMd(res.data);
      });
  },
};
</script>


<style scoped>
.reader {
  letter-spacing: 0.05rem;
}

.reader >>> hr {
  border: none;
  border-bottom: 1px solid rgb(210, 210, 210);
}

.reader >>> h1, .reader >>> h2, .reader >>> h3,
.reader >>> h4, .reader >>> h5, .reader >>> h6 {
  color: rgb(50, 50, 50);
  line-height: 3rem;
}

.reader >>> h1:first-of-type {
  text-align: center;
}

.reader >>> p {
  color: rgb(50, 50, 50);
  font-size: 0.9rem;
  line-height: 1.5rem;
}

.reader >>> li {
  font-size: 0.8rem;
  line-height: 1.5rem;
}

.reader >>> pre {
  padding: 20px 30px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.3rem;
}

.reader >>> a {
  color: rgb(30, 143, 172);
  text-decoration: none;
}

.reader >>> a:hover {
  text-decoration: underline;
}

.reader >>> blockquote {
  margin: 0;
  padding: 1rem 2rem;
  background: linear-gradient(to right, rgb(170, 170, 170) 4px, rgb(240, 240, 240) 4px);
}

.reader >>> img {
  width: 100%;
  height: 100%;
}
</style>
