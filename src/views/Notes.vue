<template>
  <div>
    <blog-header></blog-header>

    <transition-group class="notes_container" tag="ul">
      <note-poster v-for="note in notes" :key="note.id" class="notes"
        :title="note.title"
        :route="note.route"
        :filename="note.filename"
        :covername="note.covername"
        :date="note.date"
      ></note-poster>
    </transition-group>

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
      notes: [],
      style: {
        backgroundImage: 'gray',
      },
    };
  },

  methods: {
    isValidNotesList(obj) {
      return Reflect.has(obj, 'notes');
    },

    updateNotesValue(data) {
      if (this.isValidNotesList(data)) {
        this.notes = data.notes;
      } else {
        console.error('"notes" doesn\'t exist in list');
      }
    },
  },

  mounted() {
    console.log('notes node mounted');

    this.$http.get('list.json')
      .then((res) => {
        this.updateNotesValue(res.data);
      });
  },

};
</script>

<style scoped>
.notes_container {
  margin: 0 18%;
  padding: 0;
}

.notes {
  width: 30%;
  margin-bottom: 3%;
  list-style: none;
  float: left;
}

@media screen and (max-width: 1024px) {
  .notes {
    width: 48% !important;
  }
}

@media screen and (max-width: 567px) {
  .notes {
    width: 100% !important;
  }
}

.notes:not(:nth-child(3n)) {
  margin-right: 5%;
}

@media screen and (max-width: 1024px) {
  .notes:not(:nth-child(3n)) {
    margin-right: 0;
  }

  .notes:not(:nth-child(2n)) {
    margin-right: 4% !important;
  }
}

@media screen and (max-width: 567px) {
  .notes {
    margin-right: 0 !important;
  }
}
</style>
