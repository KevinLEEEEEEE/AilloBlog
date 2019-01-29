<template>
  <div :class="`catalog-${theme}-theme`">
    <blog-header :theme="theme"></blog-header>

    <div class="catalog">
      <ul class="catalog-container">
        <li class="item-container fadeandtranslatein" v-for="item in list" :key="item.objectId">
          <div :is="poster" class="item"
            :title="item.title"
            :description="item.description"
            :route="`${path}/${item.folder}`"
            :filename="item.filename"
            :covername="item.covername"
            :date="item.date"
            :routename="item.routename"
            :theme="theme"
          ></div>
        </li>
      </ul>

      <page-number class="pagination"
        :route="`/catalog/${category}`"
        :count="pagesCount"
        :theme="theme"
      ></page-number>
    </div>

    <blog-footer :theme="theme"></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';
import PageNumber from '../components/PageNumber.vue';
import ImagePoster from '../components/ImagePoster.vue';
import ArticlePoster from '../components/ArticlePoster.vue';
import api from '../api/api';

export default {
  name: 'catalog',
  components: {
    BlogHeader,
    BlogFooter,
    PageNumber,
    ArticlePoster,
    ImagePoster,
  },
  props: {
    category: String,
    page: String,
  },
  data() {
    return {
      list: [],
      path: '',
      poster: '',
      itemsPerPage: 12,
      itemsAmount: 0,
    };
  },

  computed: {
    pagesCount() {
      return Math.ceil(this.itemsAmount / this.itemsPerPage);
    },

    theme() {
      return this.$store.state.theme;
    },
  },

  watch: {
    '$route.params.page': function callback(to, from) {
      if (to !== from) {
        this.updateCategoryList();
      }
    },

    '$route.params.category': function callback(to, from) {
      if (to !== from) {
        this.updateCategoryInfo();

        this.updateCategoryList();
      }
    },
  },

  methods: {
    updateCategoryInfo() {
      switch (this.category) {
        case 'notes': {
          this.path = 'blog/notes';

          this.poster = 'article-poster';

          api.notes.getCount()
            .then((res) => {
              console.log(res);
              this.itemsAmount = res;
            });

          break;
        }

        case 'informal-essays': {
          this.path = 'blog/informal-essays';

          this.poster = 'article-poster';

          api.informalEssays.getCount()
            .then((res) => {
              console.log(res);
              this.itemsAmount = res;
            });

          break;
        }

        default:
          console.error(`no such category: ${this.category}`);
      }
    },

    updateCategoryList() {
      const page = parseInt(this.page, 10);

      switch (this.category) {
        case 'notes': {
          api.notes.getListByPage(this.itemsPerPage, page)
            .then((res) => {
              this.list = res;
            });

          break;
        }

        case 'informal-essays': {
          api.informalEssays.getListByPage(this.itemsPerPage, page)
            .then((res) => {
              this.list = res;
            });

          break;
        }

        default:
          console.error(`no such category: ${this.category}`);
      }
    },
  },

  created() {
    this.updateCategoryInfo();

    // this.updateCategoryList();
  },
};
</script>

<style>
.catalog-night-theme {
  background-color: rgb(18, 18, 18);
}

.catalog-day-theme {
  background-color: transparent;
}

.catalog {
  min-height: 90vh;
  padding: 0 18% 5vh 18%;
}

.catalog-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .catalog-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .catalog-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 567px) {
  .catalog-container {
    grid-template-columns: 1fr;
  }
}

.item-container {
  min-width: 0;
  align-self: stretch;
  list-style: none;
}

.item {
  height: 100%; /* make sure the underline is at the same level */
}

.pagination {
  margin-top: 5vh;
}
</style>
