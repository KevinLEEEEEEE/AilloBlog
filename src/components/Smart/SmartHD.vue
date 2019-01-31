<template>
  <div class="smart-hd-container">
    <img class="smart-hd-content" alt="cover" :src="src"/>

    <button class="full-screen-btn" @click="fullScreenToggle"></button>

    <div class="smart-hd-progress-bar" v-if="progress"
     :style="barStyle"
    ></div>
  </div>
</template>

<script>
import smart from './Smart';

export default {
  name: 'smart-hd',
  props: {
    path: String,
    progress: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      src: '',
      loaded: 0,
    };
  },

  computed: {
    barStyle() {
      return {
        opacity: this.loaded < 100 ? 100 : 0,
        '--position': `${this.loaded}%`,
      };
    },
  },

  methods: {
    loadFullImage() {
      const callback = this.progress ? this.updateProgress : null;

      this.$imageloader.loadImageAuto(this.path, callback)
        .then((res) => {
          this.src = res.data;

          smart.network.addNetworkInfo(res.size, res.duration);
        }, () => {
          console.log('image loading failed');
        });
    },

    fullScreenToggle() {

    },

    updateProgress(e) {
      this.loaded = (e.loaded / e.total) * 100;
    },
  },

  mounted() {
    this.loadFullImage();
  },
};
</script>

<style>
.smart-hd-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
}

.smart-hd-progress-bar {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
  height: 25px;
  border: 2px black solid;
  border-radius: 100%;
  background: linear-gradient(to top, black var(--position, 0%), white var(--position, 0%));
  transition: all ease 1s;
}

.full-screen-btn {
  position: absolute;
  right: 1%;
  top: 2%;
  width: 40px;
  height: 40px;
  background: url('../../assets/close.png') no-repeat center center
              rgba(0, 0, 0, 0.7);
  background-size: 12px;
  border: none;
  border-radius: 20px;
  outline: none;
  opacity: 0.7;
  transition: all 0.2s ease;
  cursor: pointer;
}

.full-screen-btn:hover {
  opacity: 1;
  transform: rotate(-90deg);
}
</style>
