<template>
  <li>
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
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </p>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'note-poster',
  props: {
    title: String,
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
  height: 400px;
  border-bottom: 1px lightgray solid;
  text-align: left;
}

.poster_container:hover {
  border-bottom-color: gray;
}

.poster_container:hover .cover {
  transform: scale(1.01);
}

.poster_container:hover .title {
  overflow: visible;
}

.cover_container {
  height: 200px;
  overflow: hidden;
}

.cover {
  transition: transform 0.3s ease;
}

.title {
  margin: 20px 0 5px 0;
  color: black;
  overflow: hidden;
  font-weight: 900;
  font-size: 1.3rem;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info {
  color: lightgray;
  font-weight: 700;
  font-size: 0.6rem;
}

.description {
  margin-top: 1rem;
  padding-right: 2rem;
  color: rgb(82, 82, 82);
  font-size: 0.8rem;
  word-wrap: break-word;
}

a {
  text-decoration: none;
}

/* .cover {
  height: 30vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.title {
  display: block;
  height: 100%;
  padding: 1rem 2rem 0 1rem;
  box-sizing: border-box;
  color: white;
  font-size: 2.8vw;
  font-weight: 900;
  text-decoration: none;
  text-align: left !important;
  text-transform: capitalize;
  word-wrap: break-word;
  -webkit-transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
  -moz-transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
  -o-transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
  transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
}

.title:hover {
  background-color: rgba(0, 0, 0, .6);
}

.info {
  height: 10%;
  font-size: 1vw;
  text-align: start;
  text-indent: 5%;
  line-height: 30px;
} */
</style>
