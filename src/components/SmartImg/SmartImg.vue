<template>
  <div ref="container" class="smart-img-container">
    <img class="smart-img-content"
      :src="src"
      :width="displayWidth"
      :height="displayHeight"
      :alt="alt"
    />
    <div class="smart-img-progress-bar" v-if="isProgressBarVisible"
     :style="style"
    ></div>
  </div>
</template>

<script>
import smartImg from './SmartImg';

export default {
  name: 'smart-img',
  props: {
    path: String,
    width: Number,
    height: Number,
    quality: {
      type: Number,
      required: false,
    },
    alt: {
      type: String,
      default: 'image',
    },
    progress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      src: '',
      displayWidth: 0,
      displayHeight: 0,
      loadPercentage: 0,
    };
  },

  computed: {
    style() {
      return {
        opacity: this.loadPercentage < 100 ? 100 : 0,
        '--position': `${this.loadPercentage}%`,
      };
    },

    isProgressBarVisible() {
      return this.progress && this.src !== '';
    },
  },

  methods: {
    initSizeInfo() {
      const { clientWidth } = this.$refs.container.parentNode;
      const scaleRatio = clientWidth / this.width;
      const width = scaleRatio >= 1 ? this.width : clientWidth;
      const height = scaleRatio >= 1 ? this.height : this.height * scaleRatio;

      this.displayWidth = Math.ceil(width / 50) * 50;
      this.displayHeight = Math.ceil(height / 50) * 50;
    },

    loadThumbnail() {
      const setting = `imageView2/1/w/${this.displayWidth / 50}/h/${this.displayHeight / 50}/q/50|imageslim`;

      this.$imageloader.loadImageAuto(this.path, setting)
        .then((res) => {
          this.src = res.data;

          this.registerLazyLload();
        });
    },

    loadFullImage() {
      const quality = smartImg.network.getImageQuality();
      const setting = `imageView2/1/w/${this.displayWidth}/h/${this.displayHeight}/q/${quality}|imageslim`;
      const loader = this.progress
        ? this.$imageloader.loadImageAutoWithProgress(this.path, setting, this.updateProgress)
        : this.$imageloader.loadImageAuto(this.path, setting);

      loader.then((res) => {
        this.src = res.data;

        smartImg.network.addNetworkInfo(res.size, res.duration);
      });
    },

    updateProgress(e) {
      this.loadPercentage = (e.loaded / e.total) * 100;
    },

    registerLazyLload() {
      this.$refs.container.addEventListener('loadFullImage', () => {
        this.loadFullImage();
      });

      smartImg.lazyload.register(this.$refs.container);
    },
  },

  mounted() {
    this.initSizeInfo();

    this.loadThumbnail();
  },
};
</script>

<style scoped>
.smart-img-container {
  position: relative;
  font-size: 0;
}

.smart-img-content {
  width: 100%;
  height: auto;
}

.smart-img-progress-bar {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
  height: 25px;
  border: 2px black solid;
  border-radius: 50%;
  background: linear-gradient(to top, black var(--position, 0%), white var(--position, 0%));
  transition: all ease 1s;
}
</style>
