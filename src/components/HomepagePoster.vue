<template>
  <div class="homepage_poster" @click="pagejump">
    <div class="cover_container">
      <img class="homepage_cover" ref="cover" alt="homepage image">
    </div>

    <a class="title">
      {{ title }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'homepage-poster',
  props: {
    title: String,
    route: String,
    filename: String,
    covername: String,
    routeName: String,
  },

  methods: {
    updateBgImage() {
      const path = `${this.route}/${this.covername}`;
      const setting = 'imageView2/0/q/50|imageslim';

      this.$imageloader.loadImageAuto(path, setting)
        .then((res) => {
          this.$refs.cover.setAttribute('src', res);
        });
    },

    pagejump() {
      this.$router.push({
        name: this.routeName,
        params: {
          route: this.route,
          filename: this.filename,
        },
      });
    },
  },

  mounted() {
    this.updateBgImage();
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

.cover_container {
  overflow: hidden;
  font-size: 0;
}

.homepage_cover {
  max-width: 100%;
  height: auto;
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
