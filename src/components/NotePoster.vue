<template>
  <li>
    <div class="cover" :style="style">
      <router-link class="title"
        :to="`/read/${filename}`">
        {{ title }}
      </router-link>
    </div>

    <img src="" alt="" id="hi">

    <div class="info">
      {{ date }}
    </div>
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
      style: {
        backgroundImage: 'gray',
      },
    };
  },

  methods: {
    updateBgImage() {
      const path = `${this.route}/${this.covername}`;

      if (process.env.NODE_ENV === 'production') {
        this.imageloader.loadImageFromCDN(path, 'imageView2/0/q/75|imageslim')
          .then((res) => {
            this.style.backgroundImage = res;
          });
      } else {
        this.imageloader.loadImageFromLocal(`${this.route}/${this.covername}`)
          .then((res) => {
            this.style.backgroundImage = `url(${res.result})`;
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
.cover {
  height: 30vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.title {
  display: block;
  height: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
  color: white;
  font-size: 3vw;
  font-weight: 900;
  text-decoration: none;
  text-align: left !important;
  text-transform: capitalize;
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
}
</style>
