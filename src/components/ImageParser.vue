<template>
  <div :class="[`image-parser-${theme}-theme`,,'image-parser']" ref="doc">
    <image-content v-for="item in list" :key="item.id"
      :src="item.src"
      :srcfull="item.src_full"
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

        setTimeout(() => {
          this.$lazyload(this.$refs.doc); // why?
        }, 50);
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

.image-parser {
  margin-top: 50px;
}
</style>
