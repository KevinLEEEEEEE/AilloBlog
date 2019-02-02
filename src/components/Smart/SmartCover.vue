<template>
  <div ref="container" class="smart-cover-container" :style="sizeLockStyle">
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
    cancelRequest: {
      type: String,
      default: 'off',
    },
    sizeLock: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      src: '',
      width: 0,
      height: 0,
      source: null,
      cancelToken: null,
      isThumbnailOnShow: false,
    };
  },

  computed: {
    thumbnail() {
      return {
        width: Math.round(this.width / config.thumbnailScaleRatio),
        height: Math.round(this.height / config.thumbnailScaleRatio),
      };
    },

    sizeLockStyle() {
      return this.sizeLock && this.isThumbnailOnShow
        ? { width: `${this.width}px`, height: `${this.height}px` }
        : {};
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
      const setting = `imageView2/1/w/${this.thumbnail.width}/h/${this.thumbnail.height}/q/25|imageslim`;

      this.$imageloader.loadImage(`${this.path}?${setting}`)
        .then((res) => {
          this.src = res.data;

          this.isThumbnailOnShow = true;

          this.registerLazyLload();
        }, () => {
          this.registerLazyLload();

          // handle request fail
        });
    },

    loadFullImage() {
      const quality = smart.network.getImageQuality();
      const setting = `imageView2/1/w/${this.width}/h/${this.height}/q/${quality}|imageslim`;

      this.$imageloader.loadImage(`${this.path}?${setting}`)
        .then((res) => {
          this.src = res.data;

          this.isThumbnailOnShow = false;

          smart.network.addNetworkInfo(res.size, res.duration);
        }, () => {
          // handle request fail
        });
    },

    registerLazyLload() {
      this.$refs.container.addEventListener('loadFullImage', this.loadFullImage);

      smart.lazyload.register(this.$refs.container);
    },

    registerCancelToken() {
      switch (this.cancelRequest) {
        case 'off':
          this.source = {};
          this.cancelToken = {
            cancelToken: null,
          };
          break;
        case 'onDestory':
          this.source = smart.network.generateCancelSource();
          this.cancelToken = {
            cancelToken: this.source.token,
          };
          break;
        case 'onRouteChange':
          break;
        default:
      }
    },

    handleCancelToken() {
      switch (this.cancelRequest) {
        case 'off':
          break;
        case 'onDestory':
          if (this.src === '') {
            this.source.cancel();
          }
          break;
        case 'onRouteChange':
          break;
        default:
      }
    },
  },

  mounted() {
    this.registerCancelToken();

    this.initSizeInfo();

    this.loadThumbnail();
  },

  beforeDestroy() {
    this.handleCancelToken();
  },
};
</script>

<style>
.smart-cover-container {
  overflow: hidden;
  font-size: 0;
}

.smart-cover-content {
  width: 100%;
  height: auto;
}
</style>
