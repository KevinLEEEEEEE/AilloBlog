<template>
  <div class="catalog-poster" @click="pagejump"
    :class="`catalog-poster-${theme}-theme`">
    <div class="catalog-poster-cover-container">
      <smart-cover
        :path="path"
        :raw-width="width"
        :raw-height="height"
      ></smart-cover>
    </div>

    <p class="catalog-poster-title">
      {{ title }}
    </p>

    <p class="catalog-poster-info">
      Posted：{{ date }}
    </p>

    <p class="catalog-poster-description">
      {{ description }}
    </p>
  </div>
</template>

<script>
import SmartCover from './Smart/SmartCover.vue';

export default {
  name: 'catalog-poster',
  components: { SmartCover },
  props: {
    title: String,
    description: {
      type: String,
      required: false,
    },
    route: String,
    filename: String,
    covername: String,
    date: String,
    routename: String,
    theme: {
      type: String,
      default: 'day',
    },
  },
  data() {
    return {
      path: `${this.route}/${this.covername}`,
      width: 400,
      height: 400,
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
.catalog-poster-day-theme {
  --title-color: black;
  --info-color: rgb(180, 180, 180);
  --description-color: rgb(180, 180, 180);
}

.catalog-poster-night-theme {
  --title-color: rgb(230, 230, 230);
  --info-color: rgb(180, 180, 180);
  --description-color: rgb(180, 180, 180);
}

.catalog-poster {
  position: relative;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
}

.catalog-poster:hover .catalog-poster-cover-container {
  padding: 12%;
}

.catalog-poster-cover-container {
  padding: 13%;
  transition: padding 0.2s ease;
}

.catalog-poster-title {
  margin: 0;
  color: var(--title-color);
  font-size: 1.1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.catalog-poster-info {
  color: var(--info-color);
  font-size: 0.7em;
}

.catalog-poster-description {
  margin-top: 20px;
  padding: 0 20%;
  color: var(--description-color-color);
  font-size: 0.75em;
}
</style>
