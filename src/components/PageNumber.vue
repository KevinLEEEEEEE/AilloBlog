<template>
  <div :class="[`pagenumber-${theme}-theme`, 'pagination']">
    <div class="pagelink-container">
      <router-link v-for="index in count" :key="index"
        :to="getUrl(index)"
        :class="[index === current ? 'pagelink-current' : '', 'pagelink']"
      >{{ index }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-number',
  props: {
    route: String,
    count: Number,
    current: Number,
    theme: {
      type: String,
      default: 'day',
    },
  },

  methods: {
    mergeParams(params) {
      return Object.assign({}, this.$route.params, params);
    },

    getUrl(index) {
      const page = index.toString();

      return {
        name: this.$route.name,
        params: this.mergeParams({ page }),
      };
    },
  },
};
</script>

<style>
.pagenumber-night-theme {
  --text-color: rgb(200, 200, 200);
  --border-color: var(--text-color);
  --background-color: rgb(18, 18, 18);
}

.pagenumber-day-theme {
  --text-color: black;
  --border-color: black;
  --background-color: white;
}

.pagination {
  --side-length: 35px;
  --side-length-hover: 40px;
  height: var(--side-length);
  background-image: linear-gradient(var(--border-color) 0, var(--border-color) 100%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
}

.pagelink-container {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--background-color);
}

.pagelink {
  display: block;
  width: var(--side-length);
  height: var(--side-length);
  margin: 0 5px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  font-size: 0.8rem;
  color: var(--text-color);
  line-height: var(--side-length);
  text-align: center;
  align-content: center;
  transition: all ease 0.07s;
}

.pagelink-current, .pagelink:hover {
  height: var(--side-length-hover);
}
</style>
