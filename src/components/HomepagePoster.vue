<template>
  <li class="homepage-poster" @click="pagejump">
    <smart-cover
      :path="path"
      :raw-width="width"
      :raw-height="height"
    ></smart-cover>

    <a class="homepage-poster-title">
      {{ title }}
    </a>
  </li>
</template>

<script>
import SmartCover from './Smart/SmartCover.vue';

export default {
  name: 'homepage-poster',
  components: { SmartCover },
  props: {
    title: String,
    route: String,
    filename: String,
    covername: String,
    routename: String,
  },
  data() {
    return {
      path: `${this.route}/${this.covername}`,
      width: 1000,
      height: 600,
    };
  },

  methods: {
    pagejump() {
      this.$router.push({
        name: this.routename,
        params: {
          route: this.route,
          filename: this.filename,
        },
      });
    },
  },
};
</script>

<style>
.homepage-poster {
  position: relative;
  cursor: pointer;
  list-style: none;
}

.homepage-poster:hover .homepage-poster-title {
  opacity: 100;
}

.homepage-poster-title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity ease 0.4s;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  letter-spacing: 0.7vw;
}

@media screen and (max-width: 1024px) {
  .homepage-poster-title {
    opacity: 100;
    font-size: 0.8em;
    letter-spacing: 2vw;
  }
}
</style>
