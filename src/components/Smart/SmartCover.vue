<template>
  <div ref="container" class="smart-cover-container">
    <img class="smart-cover-content" alt="cover"
      :src="src"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import smart from './Smart';
import config from './config';

export default {
  name: 'smart-cover',
  props: {
    path: String,
    rawWidth: Number,
    rawHeight: Number,
  },
  data() {
    return {
      src: '',
      width: 0,
      height: 0,
    };
  },

  computed: {
    thumbnailWidth() {
      return Math.round(this.width / config.thumbnailScaleRatio);
    },

    thumbnailHeight() {
      return Math.round(this.height / config.thumbnailScaleRatio);
    },
  },

  methods: {
    initSizeInfo() {
      const { clientWidth } = this.$refs.container.parentNode;
      const scaleRatio = clientWidth / this.rawWidth;

      this.width = Math.round(scaleRatio >= 1 ? this.rawWidth : clientWidth);
      this.height = Math.round(scaleRatio >= 1 ? this.rawHeight : this.rawHeight * scaleRatio);
    },

    loadThumbnail() {
      const setting = `imageView2/1/w/${this.thumbnailWidth}/h/${this.thumbnailHeight}/q/25`;

      this.$imageloader.loadImageAuto(`${this.path}?${setting}`)
        .then((res) => {
          this.src = res.data;

          this.registerLazyLload();
        }, () => {
          this.registerLazyLload();
        });
    },

    loadFullImage() {
      const quality = smart.network.getImageQuality();
      const setting = `imageView2/1/w/${this.width}/h/${this.height}/q/${quality}`;

      this.$imageloader.loadImageAuto(`${this.path}?${setting}`)
        .then((res) => {
          this.src = res.data;

          smart.network.addNetworkInfo(res.size, res.duration);
        }, () => {
          console.log('image loading failed');
        });
    },

    registerLazyLload() {
      this.$refs.container.addEventListener('loadFullImage', this.loadFullImage);

      smart.lazyload.register(this.$refs.container);
    },
  },

  mounted() {
    this.initSizeInfo();

    this.loadThumbnail();
  },
};
</script>

<style>
.smart-cover-container {
  font-size: 0;
}

.smart-cover-content {
  width: 100%;
  height: auto;
}
</style>
