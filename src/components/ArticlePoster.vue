<template>
  <div @click="pagejump" :class="[`article-${theme}-theme`, 'article-poster', 'bgscale_anim']">
    <div class="article-cover-container">
      <img src="../assets/imgloading_400_300.png" class="article-cover" ref="cover">
    </div>

    <p class="article-title">
      {{ title }}
    </p>

    <p class="article-info">
      Posted：{{ date }}
    </p>

    <p class="article-description">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'article-poster',
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
.article-day-theme {
  --title-color: black;
  --info-color: rgb(180, 180, 180);
  --description-color: rgb(80, 80, 80);
  --bgscale-shadow-color: rgba(0, 0, 0, 0.2);
  --bgscale-color: black;
}

.article-night-theme {
  --title-color: white;
  --info-color: rgb(180, 180, 180);
  --description-color: rgb(140, 140, 140);
  --bgscale-shadow-color: rgba(255, 255, 255, 0.3);
  --bgscale-color: rgb(180, 180, 180);
}

.article-poster {
  font-size: 1rem;
  text-align: left;
  box-shadow: inset 0 -1px var(--bgscale-shadow-color);
  cursor: pointer;
}

.article-poster:hover .article-cover {
  transform: scale(1.02);
}

.article-cover-container {
  overflow: hidden;
}

.article-cover {
  width: 100%;
  transition: transform 0.2s ease;
  transform-origin: center bottom;
}

.article-title {
  margin: 1.3em 0 0 0;
  color: var(--title-color);
  font-size: 1.2em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@media screen and (max-width: 567px) {
  .article-title {
    white-space: normal;
  }
}

.article-info {
  color: var(--info-color);
  font-size: 0.65em;
}

.article-description {
  margin: 1.5em 0 5em 0;
  color: var(--description-color);
  font-size: 0.75em;
  word-wrap: break-word;
  letter-spacing: 1px;
}
</style>
