<template>
  <li class="bgscale_anim">
    <router-link class="poster_container"
      :to="`/read/${filename}`">
      <div class="cover_container">
        <img :src="src" alt="poster" class="cover">
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
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'note-poster',
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

      if (process.env.NODE_ENV === 'production') {
        this.imageloader.loadImageFromCDN(path, 'imageView2/0/q/75|imageslim')
          .then((res) => {
            this.src = res;
          });
      } else {
        this.imageloader.loadImageFromLocal(`${this.route}/${this.covername}`)
          .then((res) => {
            this.src = res.result;
          });
      }
    },
  },

  mounted() {
    this.updateBgImage();
  },
};
</script>

<style>
.poster_container {
  display: block;
  font-size: 0.8vw;
  text-align: left;
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .poster_container {
    font-size: 1vw;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .poster_container {
    font-size: 1.4vw;
  }
}

@media screen and (max-width: 567px) {
  .poster_container {
    font-size: 5vw;
  }
}

.cover_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  overflow: hidden;
}

.cover {
  min-width: 100%;
  min-height: 100%;
  transition: transform 0.2s ease;
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

.bgscale_anim:hover {
  animation-name: bgScale;
}

.bgscale_anim:hover .cover {
  transform: scale(1.06);
}

.bgscale_anim {
  box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to top, black 1px, transparent 1px);
  background-repeat: no-repeat;
  background-size: 0 100%;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

@keyframes bgScale {
  from {
    background-size: 0 100%;
  }

  to {
    background-size: 100% 100%;
  }
}
</style>
