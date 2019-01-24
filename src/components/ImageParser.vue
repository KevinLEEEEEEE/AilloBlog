<template>
  <div :class="`image-parser-${theme}-theme`" ref="doc">
    <image-content v-for="item in list" :key="item.id"
      :src="item.src"
      :description="item.description"
    ></image-content>
  </div>
</template>

<script>
import ImageContent from './ImageContent.vue';

export default {
  name: 'image-parser',
  components: { ImageContent },
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
      list: [],
    };
  },

  methods: {
    updateHtmlByJSON(data) {
      if (this.isValidJSON(data)) {
        this.list = data.list;

        // setTimeout(() => {
        this.$nextTick(() => {
          console.log('next tick');
          this.$lazyload(this.$refs.doc);
        });
        // }, 50);
      }
    },

    isValidJSON(obj) {
      return Reflect.has(obj, 'list');
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
.image-parser-day-theme {
  --fontcolor: rgb(40, 40, 40);
}

.image-parser-night-theme {
  --fontcolor: rgb(220, 220, 220);
}
</style>
