<template>
  <div ref="container" class="smart-rect-container">
    <img class="smart-rect-content" alt="cover"
      :src="src"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import smart from './Smart';

export default {
  name: 'smart-rect',
  props: {
    path: String,
    rawWidth: Number,
    rawHeight: Number,
    HDivideW: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      src: '',
      width: 0,
      height: 0,
    };
  },

  methods: {
    initSizeInfo() {
      const { clientWidth } = this.$refs.container.parentNode;
      const clientHeight = clientWidth * this.HDivideW;
      const clientScaleRatio = clientWidth / clientHeight;
      const imageScaleRatio = this.rawWidth / this.rawHeight;
      let width = 0;
      let height = 0;

      if (imageScaleRatio >= clientScaleRatio) {
        const imageSizeRatio = clientWidth / this.rawWidth;

        width = imageSizeRatio >= 1 ? this.rawWidth : clientWidth;
        height = imageSizeRatio >= 1 ? this.rawHeight : this.rawHeight * imageSizeRatio;
      } else {
        const imageSizeRatio = clientHeight / this.rawHeight;

        width = imageSizeRatio >= 1 ? this.rawWidth : this.rawWidth * imageSizeRatio;
        height = imageSizeRatio >= 1 ? this.rawHeight : clientHeight;
      }

      this.width = Math.round(width);
      this.height = Math.round(height);
    },

    loadThumbnail() {
      const setting = `imageView2/1/w/${this.width}/h/${this.height}/q/1|imageslim`;

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
.smart-rect-container {
  position: relative;
  font-size: 0;
}

.smart-rect-content {
  max-width: 100%;
  height: auto;
}
</style>
