<template>
  <transition-group tag="ul" class="notes_container">
    <li v-for="note in notes" :key="note.id" class="notes">
      <div class="note_image" :style="style">
        <router-link class="note_title"
          to="/">
          {{ note.title }}
        </router-link>
      </div>

      <div class="note_info">
        {{ note.data }}
      </div>
    </li>
  </transition-group>
</template>

<script>

export default {
  name: 'notes',
  components: {
  },

  data() {
    return {
      notes: [],
      bg: 'gray',
    };
  },

  computed: {
    style() {
      return {
        backgroundImage: this.bg,
      };
    },
  },

  methods: {
    isValidNotesList(obj) {
      return Reflect.has(obj, 'notes');
    },

    updateNotesValue(data) {
      if (this.isValidNotesList(data)) {
        this.notes = data.notes;
      } else {
        console.error('notes list doesn\' exist in list');
      }
    },

    updateNotesBgImage() {
     import('@/assets/notes_cover/bg.jpg')
       .then((res) => {
         this.bg = `url(${res.default})`;
       });
    },
  },

  mounted() {
    console.log('mounted');

    this.$axios.get('list.json')
      .then((res) => {
        this.updateNotesValue(res.data);

        this.updateNotesBgImage();
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

.notes:not(:nth-child(3n)) {
  margin-right: 5%
}

.note_image {
  height: 550px;
  background-repeat: no-repeat;
  background-size: cover;
}

.note_title {
  display: block;
  height: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
  color: white;
  font-size: 3rem;
  font-weight: 900;
  text-decoration: none;
  text-align: left !important;
  text-transform: capitalize;
  -webkit-transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
  -moz-transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
  -o-transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
  transition: background-color 225ms cubic-bezier(0.4, 0.25, 0.3, 1);
}

.note_title:hover {
  background-color: rgba(0, 0, 0, .6);
}

.note_info {
  height: 10%;
  text-align: start;
  text-indent: 5%;
  line-height: 30px;
}
</style>
