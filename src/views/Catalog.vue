<template>
  <div :class="`catalog-${theme}-theme`">
    <blog-header :theme="theme"></blog-header>

    <div class="catalog">
      <ul class="catalog-container">
        <li class="item-container fadeandtranslatein" v-for="item in list" :key="item.objectId">
          <catalog-poster class="item"
            :title="item.title"
            :description="item.description"
            :route="`${path}/${item.folder}`"
            :filename="item.filename"
            :covername="item.covername"
            :date="item.date"
            :routename="item.routename"
            :theme="theme"
          ></catalog-poster>
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
import CatalogPoster from '../components/CatalogPoster.vue';
import PageNumber from '../components/PageNumber.vue';
import api from '../api/api';

export default {
  name: 'catalog',
  components: {
    BlogHeader,
    BlogFooter,
    CatalogPoster,
    PageNumber,
  },
  props: {
    category: String,
    page: String,
  },
  data() {
    return {
      list: [],
      path: '',
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
      let infoApi = null;

      switch (this.category) {
        case 'notes': {
          this.path = 'blog/notes';

          infoApi = api.notes.getCount();

          break;
        }

        case 'informal-essays': {
          this.path = 'blog/informal-essays';

          infoApi = api.informalEssays.getCount();

          break;
        }

        case 'photographs': {
          this.path = 'blog/photographs';

          infoApi = api.photographs.getCount();

          break;
        }

        default:
          console.error(`no such category: ${this.category}`);
      }

      infoApi.then((res) => {
        this.itemsAmount = res;
      })
        .catch(() => {
          console.log('request failed');
        });
    },

    updateCategoryList() {
      const page = parseInt(this.page, 10);
      let listApi = null;

      switch (this.category) {
        case 'notes': {
          listApi = api.notes.getListByPage(this.itemsPerPage, page);

          break;
        }

        case 'informal-essays': {
          listApi = api.informalEssays.getListByPage(this.itemsPerPage, page);

          break;
        }

        case 'photographs': {
          listApi = api.photographs.getListByPage(this.itemsPerPage, page);

          break;
        }

        case 'designs': {
          break;
        }

        default:
          console.error(`no such category: ${this.category}`);
      }

      listApi.then((res) => {
        this.list = res;
      })
        .catch(() => {
          console.log('request failed');
        });
    },
  },

  created() {
    this.updateCategoryInfo();

    this.updateCategoryList();
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
