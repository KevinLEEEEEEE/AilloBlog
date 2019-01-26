<template>
  <div class="image-block" ref="docs">
    <img src="../assets/imgloading_1500_1000.png"  class="lazyload image-content"
      :data-src="src"
      :alt="description"
      @click="fullScreenToggle">
    <p class="image-description">{{ description }}</p>
    <div class="full-screen-viewer" v-if="isFullScreen">
      <img :src="srcfull" :alt="description" class="full-screen-image-content">
      <button class="full-screen-btn" @click="fullScreenToggle"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'image-content',
  props: {
    src: String,
    srcfull: String,
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isFullScreen: false,
    };
  },

  methods: {
    fullScreenToggle() {
      this.isFullScreen = !this.isFullScreen;
    },
  },

  mounted() {
  },
};
</script>

<style>
.image-block {
  margin-bottom: 150px;
  text-align: center;
}

.image-content {
  max-width: 100%;
  cursor: pointer;
}

.image-description {
  margin: 30px 0 0 0;
  color: var(--fontcolor);
  font-size: 0.8rem;
  text-align: center;
}

.full-screen-viewer {
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

.full-screen-image-content {
  max-width: 96%;
  max-height: 96%;
}

.full-screen-btn {
  position: absolute;
  right: 1%;
  top: 2%;
  width: 40px;
  height: 40px;
  background: url('../assets/close.png') no-repeat center center
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
