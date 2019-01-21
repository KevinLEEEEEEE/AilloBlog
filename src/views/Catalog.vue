<template>
  <div>
    <blog-header></blog-header>

    <div class="catalog">
      <ul class="catalog_container">
        <li class="item_container fadeandtranslatein" v-for="item in currList" :key="item.id">
          <catalog-poster class="item"
            :title="item.title"
            :description="item.description"
            :route="`${path}/${item.folder}`"
            :filename="item.filename"
            :covername="item.covername"
            :date="item.date"
          ></catalog-poster>
        </li>
      </ul>

      <page-number class="pagination"
        :route="`/catalog/${category}`"
        :count="pagesCount"
      ></page-number>
    </div>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';
import CatalogPoster from '@/components/CatalogPoster.vue';
import PageNumber from '@/components/PageNumber.vue';

export default {
  name: 'catalog',
  components: {
    BlogHeader,
    BlogFooter,
    PageNumber,
    CatalogPoster,
  },
  props: {
    category: String,
    page: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      itemsPerPage: 12,
      path: '/',
      list: [],
      currList: [],
    };
  },

  computed: {
    itemsCount() {
      return this.list.length;
    },

    pagesCount() {
      return Math.ceil(this.list.length / this.itemsPerPage);
    },

    currentPage() {
      const pageNumber = parseInt(this.page, 10);

      if (pageNumber < 1) {
        return 1;
      } if (pageNumber > this.pagesCount) {
        return this.pagesCount;
      }

      return pageNumber;
    },
  },

  watch: {
    '$route.params.page': function callback(to, from) {
      if (to !== from) {
        this.updateCurrList();

        this.top();
      }
    },

    '$route.params.category': function callback(to, from) {
      if (to !== from) {
        this.updateCategoryList(to);

        this.updateCurrList();

        this.top();
      }
    },
  },

  methods: {
    initCatalog(data) {
      if (this.isValidCatalog(data)) {
        this.list = data.list.reverse(); // must put before calc page number

        this.path = data.path;

        this.updateCurrList();
      }
    },

    isValidCatalog(obj) {
      return Reflect.has(obj, 'list') && Reflect.has(obj, 'path');
    },

    updateCurrList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;

      this.currList = [];

      for (let i = 0; i < this.itemsPerPage && (start + i) < this.itemsCount; i += 1) {
        this.currList.push(this.list[start + i]);
      }
    },

    top() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    updateCategoryList(name) {
      this.$http.get(`blog/${name}.json`)
        .then((res) => {
          this.initCatalog(res.data);
        });
    },
  },

  mounted() {
    console.log(this.category);
    this.updateCategoryList(this.category);
  },
};
</script>

<style scoped>
@import "../css/globalAnim.css";

.catalog {
  min-height: 100vh;
}

.catalog_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.3rem;
  margin: 0 18%;
  padding: 0;
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .catalog_container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .catalog_container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 567px) {
  .catalog_container {
    grid-template-columns: 1fr;
  }
}

.item_container {
  min-width: 0;
  align-self: stretch;
  list-style: none;
}

.item {
  height: 100%; /* make sure the underline is at the same level */
}

.pagination {
  margin: 100px 18%;
}
</style>
