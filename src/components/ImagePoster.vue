<template>
  <div class="image-poster" @click="pagejump"
    :class="[theme === 'day' ? 'image-day-theme' : 'image-night-theme']">
    <div class="image-cover-container">
      <img src="../img/imgloading.png" class="image-cover"  ref="cover">
    </div>

    <p class="image-title">
      {{ title }}
    </p>

    <p class="image-info">
      Captured：{{ date }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'image-poster',
  props: {
    title: String,
    description: String,
    route: String,
    filename: String,
    covername: String,
    date: String,
    routeName: String,
    theme: String,
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
@import '../css/globalAnim.css';

.image-day-theme {
  --title-color: black;
  --info-color: rgb(180, 180, 180);
}

.image-night-theme {
  --title-color: white;
  --info-color: rgb(180, 180, 180);
}

.image-poster {
  position: relative;
  overflow: hidden;
  font-size: 1rem;
  cursor: pointer;
}

.image-poster:hover .image-cover-container {
  padding: 8%;
}

.image-cover-container {
  padding: 9%;
  transition: padding 0.2s ease;
}

.image-cover {
  width: 100%;
}

.image-title {
  margin: 0;
  color: var(--title-color);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.image-info {
  color: var(--info-color);
  font-size: 0.6em;
}
</style>
