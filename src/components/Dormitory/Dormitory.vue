<template>
  <div class="dormitory-container">
    <div class="storage-rack storage-rack-1"></div>
    <div class="storage-rack storage-rack-2"></div>
    <div class="storage-rack storage-rack-3"></div>
    <div class="storage-rack storage-rack-4"></div>
    <div class="storage-rack storage-rack-5"></div>
    <div class="wardrobe"></div>
    <div class="drawer-small-1"></div>
    <div class="drawer-medium-1"></div>
    <div class="drawer-medium-2"></div>
    <div class="drawer-medium-3"></div>
    <div class="table"></div>
  </div>
</template>

<script>
export default {
  name: 'dormitory-container',
};
</script>

<style lang="scss">
.dormitory-container {
  display: grid;
  grid-template: repeat(1fr, 14) / repeat(1fr, 11);
  width: 98vmin;
  height: 77vmin;
  background-image: url('../../assets/dormitory.png');
  background-size: contain;
  background-repeat: no-repeat;

  .storage-rack {
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0;

    &-1 {
      grid-column: 1 / 4;
      grid-row: 1 / 3;
      background-image: url('../../assets/storage-rack-small.png');
      animation: movedown 1s ease forwards;
      animation-delay: 1s;

      &:hover {
        background-image: url('../../assets/storage-rack-small-hover.png');
      }
    }

    &-2 {
      grid-column: 4 / 8;
      grid-row: 1 / 3;
    }

    &-3 {
      grid-column: 8 / 11;
      grid-row: 1 / 3;
      background-image: url('../../assets/storage-rack-small.png');

      &:hover {
        background-image: url('../../assets/storage-rack-small-hover.png');
      }
    }

    &-4 {
      grid-column: 8 / 11;
      grid-row: 3 / 5;
      background-image: url('../../assets/storage-rack-small.png');

      &:hover {
        background-image: url('../../assets/storage-rack-small-hover.png');
      }
    }

    &-5 {
      grid-column: 8 / 11;
      grid-row: 5 / 7;
      background-image: url('../../assets/storage-rack-small.png');

      &:hover {
        background-image: url('../../assets/storage-rack-small-hover.png');
      }
    }
  }

  .wardrobe {
    grid-column: 11 / 15;
    grid-row: 1 / 9;
  }

  .drawer-small-1 {
    grid-column: 8 / 11;
    grid-row: 8 / 9;
  }

  .drawer-medium-1 {
    grid-column: 11 / 15;
    grid-row: 9 / 10;
  }

  .drawer-medium-2 {
    grid-column: 11 / 15;
    grid-row: 10 / 11;
  }

  .drawer-medium-3 {
    grid-column: 11 / 15;
    grid-row: 11 / 12;
  }

  .table {
    grid-column: 1 / 11;
    grid-row: 7 / 8;
  }
}

@keyframes movedown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 100;
  }
}
</style>
