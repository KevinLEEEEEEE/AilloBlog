<template>
  <div @click="pagejump" :class="[`article-${theme}-theme`, 'article-poster', 'bgscale_anim']">
    <div class="article-cover-container">
      <smart-img class="article-cover"
        :path="path"
        :width="width"
        :height="height"
        :alt="title"
      ></smart-img>
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
import SmartImg from './SmartImg/SmartImg.vue';

export default {
  name: 'article-poster',
  components: { SmartImg },
  props: {
    title: String,
    description: String,
    route: String,
    filename: String,
    covername: String,
    date: String,
    routename: String,
    theme: String,
  },
  data() {
    return {
      path: `${this.route}/${this.covername}`,
      width: 400,
      height: 300,
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
  overflow: hidden;
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
