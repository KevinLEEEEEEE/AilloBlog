<template>
  <div class="home">
    <blog-header class="head"></blog-header>

    <div class="welcome">
      <div class="big ball"></div>
      <div class="middle ball"></div>
      <div class="small ball"></div>
      <p class="welcometitle">Welcome!</p>
      <p class="welcometext">JUST A TINY BLOG FOR AILLO <span>(￣︶￣)</span></p>
    </div>

    <div class="selfintro">
      <div>我是谁</div>
      <div>我从哪里来</div>
      <div>我要到哪里去</div>
    </div>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';

export default {
  name: 'home',
  components: { BlogHeader, BlogFooter },
  data() {
    return {
    };
  },

  mounted() {
  },
};
</script>

<style scoped>
.head {
  position: absolute;
  width: 64%;
  z-index: 2;
}

.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  overflow: hidden;
  font-size: 1vw;
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .welcome {
    font-size: 1.5vw;
  }
}

@media screen and (max-width: 567px) {
  .welcome {
    font-size: 2vw;
  }
}

.ball {
  position: absolute;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.big {
  bottom: -35vmax;
  left: 5%;
  width: 70vmax;
  height: 70vmax;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.05));
}

.big:hover {
  transform: translateY(-30px);
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .big {
    bottom: -40vmax;
    left: 3%;
    width: 80vmax;
    height: 80vmax;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .big {
    bottom: -25vmax;
    left: -25%;
    width: 90vmax;
    height: 90vmax;
  }
}

@media screen and (max-width: 567px) {
  .big {
    bottom: -5vmax;
    left: -55%;
    width: 70vmax;
    height: 70vmax;
  }
}

.middle {
  top: 5%;
  left: 58%;
  width: 33vw;
  height: 33vw;
  background: linear-gradient(rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.1));
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .middle {
    width: 32vw;
    height: 32vw;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .middle {
    top: 15%;
    width: 35vw;
    height: 35vw;
  }
}

@media screen and (max-width: 567px) {
  .middle {
    top: 20%;
    width: 45vw;
    height: 45vw;
  }
}

.middle:hover {
  transform: translateX(25px);
}

.small {
  top: -10%;
  left: 6%;
  width: 13vw;
  height: 13vw;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.15));
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .small {
    top: -8%;
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .small {
    top: -2%;
  }
}

@media screen and (max-width: 567px) {
  .small {
    top: -3%;
    width: 20vw;
    height: 20vw;
  }
}

.small:hover {
  transform: translateY(15px);
}

.welcometitle {
  margin: 0;
  font-size: 8em;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.8);
}

.welcometext {
  margin: 0;
  font-size: 1.1em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .welcometext {
    font-size: 1.3em;
  }
}

@media screen and (max-width: 567px) {
  .welcometext {
    font-size: 1.5em;
  }
}

.welcometext span {
  font-size: 0.8em;
  vertical-align: top;
}

.selfintro {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;
  padding: 4px 0;
}

@media screen and (max-width: 1024px) {
  .selfintro {
    grid-template-columns: 1fr;
  }
}

.selfintro div {
  color: rgb(200, 200, 200);
  font-size: 2rem;
  font-weight: 900;
  line-height: 18vmax;
  background: rgb(240, 240, 240);
}

@media screen and (max-width: 1024px) {
  .selfintro div {
    line-height: 25vmax;
  }
}
</style>
