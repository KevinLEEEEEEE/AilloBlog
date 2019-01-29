<template>
  <div class="homepage_poster" @click="pagejump">
    <div class="cover_container">
      <smart-img
        :path="path"
        :width="width"
        :height="height"
        :alt="title"
      ></smart-img>
    </div>

    <a class="title">
      {{ title }}
    </a>
  </div>
</template>

<script>
import SmartImg from './SmartImg/SmartImg.vue';

export default {
  name: 'homepage-poster',
  components: { SmartImg },
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
.homepage_poster {
  position: relative;
  cursor: pointer;
}

.homepage_poster:hover .title {
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
