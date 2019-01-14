<template>
  <div>
    <blog-header></blog-header>

    <ul class="notes_container">
      <note-poster v-for="note in notes" :key="note.id" class="notes_cell"
        :title="note.title"
        :route="note.route"
        :filename="note.filename"
        :covername="note.covername"
        :date="note.date"
      ></note-poster>
    </ul>

    <div class="pagination">
      <div class="link_container">
        <router-link to="/notes/1" class="pagelink">1</router-link>
        <router-link to="/notes/2" class="pagelink">2</router-link>
      </div>
    </div>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';
import NotePoster from '@/components/NotePoster.vue';

export default {
  name: 'notes',
  components: { BlogHeader, BlogFooter, NotePoster },

  data() {
    return {
      itemPerPage: 9,
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
  },

  watch: {
    '$route.params.page': (to, from) => {
      if (to !== from) {
        this.updateNotesValue(parseInt(to, 10));
      }
    },
  },

  methods: {
    initNotesList(data) {
      if (this.isValidNotesList(data)) {
        this.notesList = data.notes;

        this.updateNotesValue(1);
      } else {
        console.error('"notes" doesn\'t exist in list');
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
    console.log('notes node mounted');

    this.$http.get('list.json')
      .then((res) => {
        this.initNotesList(res.data);
      });
  },

};
</script>

<style scoped>
.notes_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem 1rem;
  margin: 0 18%;
  padding: 0;
}

@media screen and (max-width: 1024px) {
  .notes_container {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 10%;
  }
}

@media screen and (max-width: 567px) {
  .notes_container {
    grid-template-columns: 1fr;
    margin: 0 10%;
  }
}

.notes_cell {
  min-width: 0;
  list-style: none;
}

.pagination {
  height: 35px;
  margin: 50px 18%;
  background-image: linear-gradient(transparent calc(50% - 0.5px),
                                  black calc(50% - 0.5px),
                                  black calc(50% + 0.5px),
                                    transparent calc(50% + 0.5px),
                                    transparent 100%);
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

.pagelink:hover {
  height: 40px;
}
</style>
