<template>
  <div class="catalog_poster bgscale_anim" @click="pagejump">
    <div class="cover_container imgload_container">
      <img :src="src" class="poster_cover imageload_cover" ref="cover">
      <div class="imgload_text">loading</div>
    </div>

    <p class="title">
      {{ title }}
    </p>

    <p class="info">
      Posted：{{ date }}
    </p>

    <p class="description">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'catalog-poster',
  props: {
    title: String,
    description: String,
    route: String,
    filename: String,
    covername: String,
    date: String,
  },
  data() {
    return {
      src: '',
    };
  },

  methods: {
    updateBgImage() {
      const path = `${this.route}/${this.covername}`;
      const setting = 'imageView2/0/q/50|imageslim';
      const loader = process.env.NODE_ENV === 'production'
        ? () => this.imageloader.loadImageFromCDN(path, setting)
        : () => this.imageloader.loadImageFromLocal(path);

      this.$refs.cover.onerror = () => {
        if (process.env.NODE_ENV === 'production') {
          this.imageloader.loadImageFromLocal(path).then((res) => {
            this.src = res.result;
          });
        }
      };

      loader().then((res) => {
        this.src = res.result;
      });
    },

    pagejump() {
      this.$router.push({
        name: 'read',
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
@import '../css/imgloadAnim.css';

.catalog_poster {
  overflow: hidden;
  font-size: 0.85vw;
  text-align: left;
  box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.catalog_poster:hover .poster_cover {
  transform: scale(1.04);
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .catalog_poster {
    font-size: 1.2vw;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .catalog_poster {
    font-size: 1.5vw;
  }
}

@media screen and (max-width: 567px) {
  .catalog_poster {
    font-size: 4.5vw;
  }
}

.cover_container {
  overflow: hidden;
}

.poster_cover {
  max-width: 100%;
  height: auto;
  transition: transform 0.2s ease;
  transform-origin: center bottom;
}

.poster_cover[src=''] {
  height: 250px;
}

.title {
  margin: 20px 0 0 0;
  overflow: hidden;
  color: black;
  font-size: 1.2em;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .title {
    font-size: 1.4em;
  }
}

@media screen and (max-width: 567px) {
  .title {
    white-space: normal;
  }
}

.info {
  color: rgb(180, 180, 180);
  font-size: 0.65em;
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .info {
    font-size: 0.75em;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .info {
    font-size: 0.75em;
  }
}

.description {
  margin: 1.5em 0 5em 0;
  padding-right: 1rem;
  color: rgb(80, 80, 80);
  font-size: 0.8em;
  word-wrap: break-word;
  letter-spacing: 1px;
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .description {
    font-size: 0.9em;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .description {
    font-size: 0.9em;
  }
}

@media screen and (max-width: 567px) {
  .description {
    font-size: 0.7em;
  }
}

a {
  text-decoration: none;
}
</style>
