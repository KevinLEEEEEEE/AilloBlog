<template>
  <div v-html="rawHtml" class="md-reader" ref="doc"></div>
</template>

<script>
export default {
  name: 'md-parser',
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

        this.convertAnchor(frag);
      });
    },

    highlightCodeInHtml() {
      const blocks = document.querySelectorAll('pre');

      blocks.forEach((block) => {
        this.$highlight.highlightBlock(block);
      });
    },

    convertAnchor(frag) {
      frag.addEventListener('click', this.handleAnchorClick);

      frag.querySelectorAll('a').forEach((tag) => {
        tag.target = '_blank';
      });
    },

    handleAnchorClick(e) {
      if (this.isScrollAnchor(e.target)) {
        e.preventDefault();

        this.scrollToNode(e.target.getAttribute('href'));
      }
    },

    isScrollAnchor(node) {
      if (!node || node.nodeName !== 'A') {
        return false;
      }

      const href = node.getAttribute('href');

      if (href) {
        return href[0] === '#';
      }

      return false;
    },

    scrollToNode(id) {
      const node = this.$refs.doc.querySelector(id);

      if (node !== null) {
        window.scrollTo({
          top: node.offsetTop,
          behavior: 'smooth',
        });
      }
    },
  },

  mounted() {
    this.$axios.get(`${this.filename}.md`)
      .then((res) => {
        this.updateHtmlByMd(res.data);
      });
  },
};
</script>

<style scoped>
.md-reader {
  letter-spacing: 0.05rem;
  --fontcolor: rgb(40, 40, 40);
}

.md-reader >>> hr {
  border: none;
  border-bottom: 1px solid rgb(210, 210, 210);
}

.md-reader >>> h1, .md-reader >>> h2, .md-reader >>> h3,
.md-reader >>> h4, .md-reader >>> h5, .md-reader >>> h6 {
  color: var(--fontcolor);
  line-height: 3rem;
}

.md-reader >>> h1:first-of-type {
  text-align: center;
}

.md-reader >>> p {
  color: var(--fontcolor);
  font-size: 0.9rem;
  line-height: 1.5rem;
}

.md-reader >>> li {
  font-size: 0.8rem;
  line-height: 1.5rem;
}

.md-reader >>> pre {
  padding: 20px 30px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.3rem;
}

.md-reader >>> a {
  color: rgb(30, 143, 172);
  text-decoration: none;
}

.md-reader >>> a:hover {
  text-decoration: underline;
}

.md-reader >>> blockquote {
  margin: 0;
  padding: 1rem 2rem;
  background: linear-gradient(to right, rgb(170, 170, 170) 4px, rgb(240, 240, 240) 4px);
}

.md-reader >>> img {
  max-width: 100%;
}
</style>
