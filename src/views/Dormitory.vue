<template>
  <div class="dormitory">
    <blog-header theme="night" class="head"></blog-header>
    <dormitory-container></dormitory-container>
  </div>
</template>

<script>
import DormitoryContainer from '../components/Dormitory/Dormitory.vue';
import BlogHeader from '../components/BlogHeader.vue';

export default {
  name: 'dormitory',
  components: {
    DormitoryContainer,
    BlogHeader,
  },
};
</script>

<style lang="scss">
.dormitory {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  height: 100vh;
  background-color: rgb(12, 13, 14);

  .head {
    position: absolute;
    width: 64%;
    top: 0;
    font-size: 1.5rem;
  }
}
</style>
