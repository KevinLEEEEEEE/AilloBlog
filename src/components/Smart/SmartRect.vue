<template>
  <div class="smart-rect" ref="container">
    <img class="smart-rect-content" ref="content" alt="cover"/>
  </div>
</template>

<script>
import smart from './smart';
import config from './config';

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
      computedWidth: 0,
      computedHeight: 0,
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

      this.computedWidth = Math.round(width);
      this.computedHeight = Math.round(height);
    },

    loadThumbnail() {
      this.loadImage(this.computedWidth, this.computedHeight, config.rect.thumbnailQuality);
    },

    loadFullImage() {
      this.loadImage(this.computedWidth, this.computedHeight, config.rect.fullImageQuality);
    },

    loadImage(width = 100, height = 100, quality = 75, isSlim = true) {
      const setting = `imageView2/1/w/${width}/h/${height}/q/${quality}${isSlim ? '|imageslim' : ''}`;

      this.$imageloader.loadImage(`${this.path}?${setting}`)
        .then((res) => {
          this.$refs.content.setAttribute('src', res.data);
        });
    },

    registerLazyLoad() {
      this.$refs.content.addEventListener('loadFullImage', this.loadFullImage);

      smart.lazyload.register(this.$refs.content);
    },
  },

  mounted() {
    this.initSizeInfo();

    this.registerLazyLoad();

    this.loadThumbnail();
  },
};
</script>
