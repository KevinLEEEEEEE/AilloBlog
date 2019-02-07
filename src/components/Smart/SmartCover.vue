<template>
  <div class="smart-cover" ref="container">
    <img class="smart-cover-content" ref="content" alt="cover"/>
  </div>
</template>

<script>
import smart from './SmartUtils/index';

export default {
  name: 'smart-cover',
  props: {
    path: String,
    rawWidth: Number,
    rawHeight: Number,
  },
  data() {
    return {
      computedWidth: 0,
      computedHeight: 0,
      thumbnailWidth: 0,
      thumbnailHeight: 0,
    };
  },

  methods: {
    initSizeInfo() {
      const { clientWidth } = this.$refs.container;
      const scaleRatio = clientWidth / this.rawWidth;
      const width = scaleRatio >= 1 ? this.rawWidth : clientWidth;
      const height = scaleRatio >= 1 ? this.rawHeight : this.rawHeight * scaleRatio;

      this.computedWidth = Math.round(width);
      this.computedHeight = Math.round(height);

      /* the size of the thumbnail should always be the multiple of 10
       * because the thumbnail is set to 100, whick will load image 100
       * times smaller, if the size is not the multiple of 100, then the
       * node will suffer a sudden size change when full image loaded
      */
      this.thumbnailWidth = Math.round(this.rawWidth / smart.config.thumbnailScaleRatio);
      this.thumbnailHeight = Math.round(this.rawHeight / smart.config.thumbnailScaleRatio);
    },

    loadThumbnail() {
      this.loadImage(this.thumbnailWidth, this.thumbnailHeight, smart.config.cover.thumbnailQua);
    },

    loadFullImage() {
      this.loadImage(this.computedWidth, this.computedHeight, smart.config.cover.fullImageQua);
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
