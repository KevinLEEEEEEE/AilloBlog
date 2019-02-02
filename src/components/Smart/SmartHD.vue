<template>
  <div class="smart-hd-container">
    <img class="smart-hd-content" alt="cover" :src="src" :style="imgStyle"/>

    <div class="smart-hd-progress-bar" v-if="progress" :style="barStyle"></div>
  </div>
</template>

<script>
import smart from './Smart';

export default {
  name: 'smart-hd',
  props: {
    path: String,
    cancelRequest: {
      type: String,
      default: 'off',
    },
    progress: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      src: '',
      source: null,
      cancelToken: null,
      loadedPercentage: 0,
    };
  },

  computed: {
    barStyle() {
      return {
        display: this.loadedPercentage < 100 ? 'block' : 'none',
        '--position': `${this.loadedPercentage}%`,
      };
    },

    imgStyle() {
      return {
        opacity: this.src === '' ? 0 : 100,
      };
    },
  },

  methods: {
    loadFullImage() {
      const config = Object.assign({
        onDownloadProgress: this.updateProgress,
      }, this.cancelToken);

      this.$imageloader.loadImage(this.path, config)
        .then((res) => {
          this.src = res.data;

          smart.network.addNetworkInfo(res.size, res.duration);
        }, () => {
          // handle request fail
        });
    },

    updateProgress(e) {
      this.loadedPercentage = (e.loaded / e.total) * 100;
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

    this.loadFullImage();
  },

  beforeDestroy() {
    this.handleCancelToken();
  },
};
</script>

<style>
.smart-hd-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  background-color: rgba(0, 0, 0, 0.95);
}

.smart-hd-content {
  max-width: 96%;
  max-height: 96%;
  transition: opacity ease 0.6s;
}

.smart-hd-progress-bar {
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(to top, white var(--position, 0%), transparent var(--position, 0%));
}
</style>
