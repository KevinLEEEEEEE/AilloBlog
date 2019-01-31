<template>
  <div :class="[`image-parser-${theme}-theme`,'image-parser']">
    <div v-for="item in list" :key="item.filename" class="image-parser-container">
      <smart-rect
        :path="`${route}/${item.filename}`"
        :raw-width="item.width"
        :raw-height="item.height"
        :h-divide-w="0.8"
        @click.native="fullScreenToggle(`${route}/${item.filename}`)"
      ></smart-rect>

      <p class="image-description">{{ item.description }}</p>
    </div>

    <smart-hd v-if="isFullScreen"
      :path="fullScreenPath"
    ></smart-hd>
  </div>
</template>

<script>
import SmartRect from './Smart/SmartRect.vue';
import SmartHd from './Smart/SmartHD.vue';
import api from '../api/api';

export default {
  name: 'image-parser',
  components: {
    SmartRect,
    SmartHd,
  },
  props: {
    route: String,
    name: String,
    theme: {
      type: String,
      default: 'day',
    },
  },
  data() {
    return {
      list: [],
      isFullScreen: false,
      fullScreenPath: '',
    };
  },

  methods: {
    fullScreenToggle(path) {
      this.fullScreenPath = path;

      this.isFullScreen = true;
    },
  },

  created() {
    api.photoContents.queryItemByProperty(this.name)
      .then((res) => {
        this.list = res[0].contents;
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
  margin-top: 100px;
}

.image-parser-container {
  margin-bottom: 80px;
  text-align: center;
}

.image-description {
  margin: 20px 0 0 0;
  color: var(--fontcolor, black);
  font-size: 0.8rem;
}
</style>
