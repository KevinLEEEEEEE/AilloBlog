<template>
  <div>
    <blog-header></blog-header>

    <div class="notes">
      <ul class="notes_container">
        <li class="cell_container fadeandtranslatein" v-for="note in notes" :key="note.id">
          <note-poster class="notes_cell"
            :title="note.title"
            :description="note.description"
            :route="note.route"
            :filename="note.filename"
            :covername="note.covername"
            :date="note.date"
          ></note-poster>
        </li>
      </ul>

      <page-number class="pagination"
        route="/notes"
        :count="pagesCount"
        :current="currentPage"
      ></page-number>
    </div>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';
import NotePoster from '@/components/NotePoster.vue';
import PageNumber from '@/components/PageNumber.vue';

export default {
  name: 'notes',
  components: {
    BlogHeader,
    BlogFooter,
    NotePoster,
    PageNumber,
  },
  data() {
    return {
      itemsPerPage: 12,
      notesList: [],
      notes: [],
      style: {
        backgroundImage: 'gray',
      },
    };
  },

  computed: {
    notesCount() {
      return this.notesList.length;
    },

    pagesCount() {
      return Math.ceil(this.notesCount / this.itemsPerPage);
    },

    currentPage() {
      return parseInt(this.$route.params.page, 10);
    },
  },

  watch: {
    '$route.params.page': function callback(to, from) {
      if (to !== from) {
        this.updateNotesValue(parseInt(to, 10));
      }
    },
  },

  methods: {
    initNotesList(data) {
      if (this.isValidNotesList(data)) {
        this.notesList = data.notes.reverse();

        this.updateNotesValue(1);
      }
    },

    isValidNotesList(obj) {
      return Reflect.has(obj, 'notes');
    },

    updateNotesValue(pageNumber) {
      const page = pageNumber - 1;
      const start = page * this.itemsPerPage;
      const end = (page + 1) * this.itemsPerPage;
      const tmp = [];

      for (let i = start; i < end && i < this.notesCount; i += 1) {
        tmp.push(this.notesList[i]);
      }

      this.notes = tmp;
    },
  },

  mounted() {
    this.$http.get('list.json')
      .then((res) => {
        this.initNotesList(res.data);
      });
  },

};
</script>

<style scoped>
@import "../css/globalAnim.css";

.notes {
  min-height: 100vh;
}

.notes_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.3rem;
  margin: 0 18%;
  padding: 0;
}

@media screen and (max-width: 1448px) and (min-width: 1024px) {
  .notes_container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1024px) and (min-width: 567px) {
  .notes_container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 567px) {
  .notes_container {
    grid-template-columns: 1fr;
  }
}

.cell_container {
  min-width: 0;
  align-self: stretch;
  list-style: none;
}

.notes_cell {
  height: 100%;
}

.pagination {
  margin: 100px 18%;
}
</style>
