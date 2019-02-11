<template>
  <div v-html="rawHtml" ref="doc"
    :class="[`md-reader-${theme}-theme`, 'md-reader']"
    :style="mdStyle"
  ></div>
</template>

<script>
import Showdown from 'showdown';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/htmlbars';

const converter = new Showdown.Converter();

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

export default {
  name: 'md-parser',
  props: {
    filename: String,
    theme: {
      type: String,
      default: 'day',
    },
  },
  data() {
    return {
      rawHtml: '',
    };
  },
  computed: {
    mdStyle() {
      return {
        'font-size': `${this.$store.state.markdown.fontsize}px`,
      };
    },
  },

  methods: {
    updateHtmlByMd(data) {
      const frag = this.$refs.doc;
      const htmlData = converter.makeHtml(data);

      this.rawHtml = this.$transTextForLazyload(htmlData);

      this.$nextTick(() => {
        this.highlightCodeInHtml();

        this.$lazyload(frag);

        this.convertAnchor(frag);
      });
    },

    highlightCodeInHtml() {
      const blocks = document.querySelectorAll('pre');

      blocks.forEach((block) => {
        hljs.highlightBlock(block);
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
.md-reader-day-theme {
  --fontcolor: rgb(40, 40, 40);
  --hr-color: rgb(210, 210, 210);
  --quote-start-color: rgb(170, 170, 170);
  --quote-end-color: rgb(240, 240, 240);
}

.md-reader-night-theme {
  --fontcolor: rgb(220, 220, 220);
  --hr-color: rgb(100, 100, 100);
  --quote-start-color: rgb(100, 100, 100);
  --quote-end-color: rgb(30, 30, 30);
}

.md-reader {
  line-height: 1.8em;
}

.md-reader >>> hr {
  border: none;
  border-bottom: 1px solid var(--hr-color);
}

.md-reader >>> h1, .md-reader >>> h2, .md-reader >>> h3,
.md-reader >>> h4, .md-reader >>> h5, .md-reader >>> h6 {
  color: var(--fontcolor);
  line-height: 2.5em;
}

.md-reader >>> h1:first-of-type {
  text-align: center;
}

.md-reader >>> p {
  color: var(--fontcolor);
}

.md-reader >>> li {
  font-size: 0.9em;
}

.md-reader >>> pre {
  padding: 20px 30px;
  overflow-x: auto;
  font-size: 0.9em;
}

.md-reader >>> a {
  color: rgb(30, 150, 180);
  text-decoration: none;
}

.md-reader >>> a:hover {
  text-decoration: underline;
}

.md-reader >>> blockquote {
  margin: 0;
  padding: 1rem 2rem;
  font-size: 0.9em;
  background: linear-gradient(to right, var(--quote-start-color) 4px, var(--quote-end-color) 4px);
}

.md-reader >>> img {
  max-width: 100%;
}
</style>
