<template>
  <div>
    <div v-html="rawHtml" :class="[`image-viewer-${theme}-theme`, 'image-viewer']" ref="doc"></div>
  </div>
</template>


<script>
export default {
  name: 'image-parser',
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

  methods: {
    updateHtmlByJSON(data) { // 每此nextTick载入新的图片链接
      // const frag = this.$refs.doc;

      // if (this.isValidJSON(data)) {
      //   data.list.forEach(({ src, description }) => {
      //     this.rawHtml += this.generateImageBlock(src, description);
      //   });

      //   this.$nextTick(() => {
      //     this.$lazyload(frag);
      //   });
      }
    },

    isValidJSON(obj) {
      return Reflect.has(obj, 'list');
    },

    generateImageBlock(src, description = '') {
      return `
        <div class="image-block">
          <img data-src="${src}" class="lazyload image-content">
          <p class="image-description">${description}</p>
        </div>
      `;
    },
  },

  beforeMount() {
    this.$axios.get(`${this.filename}.json`)
      .then((res) => {
        this.updateHtmlByJSON(res.data);
      });
  },
};
</script>

<style>

</style>
