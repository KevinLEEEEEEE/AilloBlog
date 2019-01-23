<template>
  <div :class="[theme === 'day' ? 'pagenumber-day-theme' : 'pagenumber-night-theme', 'pagination']">
    <div class="pagelink-container">
      <router-link v-for="index in count" :key="index"
        :to="`${route}/${index}`"
        :class="[index === currentPage ? 'pagelink-current' : '', 'pagelink']"
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
    theme: {
      type: String,
      default: 'day',
    },
  },

  computed: {
    currentPage() {
      return parseInt(this.$route.params.page, 10);
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
  background-image: linear-gradient(transparent calc(50%),
                                    var(--border-color) calc(50%),
                                    var(--border-color) calc(50% + 1px),
                                    transparent calc(50% + 1px));
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
