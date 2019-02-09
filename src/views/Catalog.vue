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
        :current="currentPage"
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
      path: `blog/${this.category}`,
      itemsPerPage: 12,
      itemsAmount: 0,
    };
  },

  computed: {
    pagesCount() {
      return Math.ceil(this.itemsAmount / this.itemsPerPage);
    },

    currentPage() {
      return parseInt(this.page, 10);
    },

    apiName() {
      return this.capitalize(this.category);
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
      api[this.apiName].getCount()
        .then((res) => {
          this.itemsAmount = res;
        });
    },

    updateCategoryList() {
      api[this.apiName].getListByPage(this.itemsPerPage, this.currentPage)
        .then((res) => {
          this.list = res;
        });
    },

    capitalize(value) {
      const [first, ...rest] = value.split('-');

      return first + (rest ? rest.map(v => v.charAt(0).toUpperCase() + v.slice(1)).join('') : '');
    },
  },

  mounted() {
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
  padding: 0 18% 90px 18%;
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
  margin-top: 60px;
}
</style>
