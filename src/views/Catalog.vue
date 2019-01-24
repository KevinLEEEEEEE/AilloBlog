<template>
  <div :class="`catalog-${theme}-theme`">
    <blog-header :theme="theme"></blog-header>

    <div class="catalog">
      <ul class="catalog-container">
        <li class="item-container fadeandtranslatein" v-for="item in currList" :key="item.id">
          <div :is="posterName" class="item"
            :title="item.title"
            :description="item.description"
            :route="`${path}/${item.folder}`"
            :filename="item.filename"
            :covername="item.covername"
            :date="item.date"
            :routeName="routeName"
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
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';
import ImagePoster from '@/components/ImagePoster.vue';
import ArticlePoster from '@/components/ArticlePoster.vue';
import PageNumber from '@/components/PageNumber.vue';

export default {
  name: 'catalog',
  components: {
    BlogHeader,
    BlogFooter,
    ImagePoster,
    ArticlePoster,
    PageNumber,
  },
  props: {
    category: String,
    page: String,
  },
  data() {
    return {
      path: '/',
      list: [],
      currList: [],
      routeName: '',
      posterName: '',
      itemsPerPage: 12,
    };
  },

  computed: {
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

    theme() {
      return this.$store.state.theme;
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
        this.routeName = data.routeName || 'read';

        this.itemsPerPage = data.itemsPerPage || 12;

        this.posterName = data.posterName || 'article-poster';

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
      const total = this.list.length;

      this.currList = [];

      for (let i = 0; i < this.itemsPerPage && (start + i) < total; i += 1) {
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
    this.updateCategoryList(this.category);
  },
};
</script>

<style>
.catalog-night-theme {
  background-color: rgb(18, 18, 18);
}

.catalog-day-theme {
  background-color: white;
}

.catalog {
  min-height: 95vh;
  padding-bottom: 5vh;
}

.catalog-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  margin: 0 18%;
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
  margin: 100px 18% 0 18%;
}
</style>
