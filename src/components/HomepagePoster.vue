<template>
  <div class="homepage-poster" @click="pagejump">
    <smart-cover
      :path="path"
      :raw-width="width"
      :raw-height="height"
      :size-lock="true"
      cancel-request="onRouteChange"
    ></smart-cover>

    <a class="title">
      {{ title }}
    </a>
  </div>
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
      height: 563,
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
}

.homepage-poster:hover .title {
  filter: opacity(100%);
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  filter: opacity(0%);
  transition: filter ease 0.4s;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.9em;
  letter-spacing: 0.8vw;
}

@media screen and (max-width: 567px) {
  .title {
    filter: none;
    font-size: 0.8rem;
    letter-spacing: 2vw;
  }
}
</style>
