<template>
  <div :class="[`image-parser-${theme}-theme`,'image-parser']">
    <div class="image-parser-container" ref="container">
      <div v-for="item in list" :key="item.filename" class="image-parser-content">
        <smart-rect
          :path="`${route}/${item.filename}`"
          :raw-width="item.width"
          :raw-height="item.height"
          :h-divide-w="hDivideW"
          cancel-request="onRouteChange"
          @click.native="fullScreenToggle(`${route}/${item.filename}`)"
        ></smart-rect>

        <p class="image-parser-description">
          {{ item.description }}
        </p>
      </div>
    </div>

    <div class="image-parser-full-screen" v-if="isFullScreen">
      <smart-hd
        :path="fullScreenPath"
        cancel-request="onDestory"
      ></smart-hd>

      <button class="full-screen-close" @click="fullScreenToggle"></button>
    </div>
  </div>
</template>

<script>
import SmartRect from './Smart/SmartRect.vue';
import SmartHd from './Smart/SmartHD.vue';
import api from '../api/api';

export default {
  name: 'image-parser',
  components: {
    SmartRect,
    SmartHd,
  },
  props: {
    route: String,
    name: String,
    theme: {
      type: String,
      default: 'day',
    },
  },
  data() {
    return {
      list: [],
      // isSnap: true,
      isFullScreen: false,
      fullScreenPath: '',
      hDivideW: 0.8,
      // containerWidth: 0,
    };
  },

  computed: {
    // containerStyle() {
    //   return this.isSnap ? {
    //     '--height': `${this.containerWidth}px`,
    //     'scroll-snap-type': 'y mandatory',
    //     'scroll-snap-points-y': `repeat(${this.containerWidth}px)`,
    //   } : {
    //     '--height': `${this.containerWidth}px`,
    //   };
    // },
  },

  methods: {
    fullScreenToggle(path = '') {
      this.fullScreenPath = path;

      this.isFullScreen = !this.isFullScreen;

      this.updateBodyScroll();
    },

    updateBodyScroll() {
      if (this.isFullScreen === false) {
        this.$store.commit('resetBodyScroll');
      } else {
        this.$store.commit('preventBodyScroll');
      }

      // this.$store.commit(`${this.isFullScreen ? 'prevent' : 'reset'}BodyScroll`);
    },

    updateImageList() {
      api.photoContents.queryItemByProperty(this.name)
        .then((res) => {
          console.log(res);
          this.list = res[0].contents;
        });
    },

    // addResizeEvent() {
    //   window.addEventListener('resize', this.updateContainerWidth);
    // },

    // removeResizeEvent() {
    //   window.removeEventListener('resize', this.updateContainerWidth);
    // },

    // updateContainerWidth() {
    //   this.containerWidth = this.$refs.container.clientWidth;
    // },
  },

  mounted() {
    this.updateImageList();

    // this.updateContainerWidth();

    // this.addResizeEvent();
  },

  // beforeDestroy() {
  //   this.removeResizeEvent();
  // },
};
</script>

<style>
.image-parser-day-theme {
  --fontcolor: rgb(40, 40, 40);
}

.image-parser-night-theme {
  --fontcolor: rgb(220, 220, 220);
}

.image-parser {
  margin-top: 50px;
}

.image-parser-container {
  /* max-height: 100vh;
  overflow-y: scroll; */
  margin-bottom: 80px;
  text-align: center;
}

/* .image-parser-container::-webkit-scrollbar {
  display: none;
} */

.image-parser-content {
  /* height: var(--height);
  scroll-snap-align: start; */
  margin-bottom: 100px;
}

.image-parser-description {
  margin: 20px 0 0 0;
  color: var(--fontcolor, black);
  font-size: 0.8rem;
}

.image-parser-full-screen {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.full-screen-close {
  position: absolute;
  right: 1%;
  top: 1%;
  width: 40px;
  height: 40px;
  z-index: 11;
  background: url('../assets/close.png') no-repeat center center
              rgba(0, 0, 0, 0.7);
  background-size: 12px;
  border: none;
  border-radius: 50%;
  outline: none;
  opacity: 0.3;
  transition: all 0.3s ease;
  cursor: pointer;
}

.full-screen-close:hover {
  opacity: 0.8;
  transform: rotate(-90deg);
}
</style>
