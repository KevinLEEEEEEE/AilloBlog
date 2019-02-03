<template>
  <div class="smart-hd">
    <img class="smart-hd-content" ref="content" alt="cover"/>

    <div class="smart-hd-progress-bar" v-if="progress" :style="barStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'smart-hd',
  props: {
    path: String,
    progress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadedPercentage: 0,
    };
  },

  computed: {
    barStyle() {
      return {
        '--position': `${this.loadedPercentage}%`,
      };
    },
  },

  methods: {
    loadFullImage() {
      this.$imageloader.loadImage(`${this.path}`, {
        onDownloadProgress: this.updateProgress,
      })
        .then((res) => {
          this.$refs.content.setAttribute('src', res.data);
        });
    },

    updateProgress(e) {
      this.loadedPercentage = (e.loaded / e.total) * 100;
    },
  },

  mounted() {
    this.loadFullImage();
  },
};
</script>
