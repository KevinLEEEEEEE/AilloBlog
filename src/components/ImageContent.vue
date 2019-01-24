<template>
  <div class="image-block" ref="docs">
    <img src="../assets/imgloading_1500_1000.png" :data-src="src" class="lazyload image-content">
    <button class="view-origin-btn">查看原图</button>
    <p class="image-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'image-content',
  props: {
    src: String,
    description: {
      type: String,
      default: '',
    },
  },

  mounted() {
  },
};
</script>

<style>
.image-block {
  position: relative;
  margin-bottom: 150px;
}

.view-origin-btn {
  display: none;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 10px 30px;
  background-color: rgba(200, 200, 200, 0.8);
  border: none;
  border-radius: 5px;
  outline: none;
}

.image-block:hover .view-origin-btn {
  display: block;
}

.image-content {
  width: 100%;
}

.image-description {
  margin: 30px 0 0 0;
  color: var(--fontcolor);
  font-size: 0.8rem;
  text-align: center;
}
</style>
