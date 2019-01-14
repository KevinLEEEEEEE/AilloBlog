<template>
  <div class="pagination">
    <div class="link_container">
      <router-link v-for="index in count" :key="index"
        :to="`${route}/${index}`"
        :class="[(index === current && count) !== 1 ? 'page_current' : '', 'pagelink']"
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
  },
};
</script>

<style scoped>
.pagination {
  height: 35px;
  margin: 50px 18%;
  background-image: linear-gradient(transparent calc(50%),
                                  black calc(50%),
                                  black calc(50% + 1px),
                                    transparent calc(50% + 1px));
}

.link_container {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
}

.pagelink {
  display: block;
  width: 35px;
  height: 35px;
  margin: 0 5px;
  border: 1px solid black;
  box-sizing: border-box;
  font-size: 0.8rem;
  line-height: 35px;
  text-align: center;
  align-content: center;
  transition: all ease 0.07s;
}

.page_current {
  height: 40px;
}

.pagelink:hover {
  height: 40px;
}
</style>
