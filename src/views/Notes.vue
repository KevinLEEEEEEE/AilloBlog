<template>
  <transition-group class="notes_container" tag="ul">
    <li class="notes" v-for="note in notes" :key="note.id">
      <div class="note_image" :style="style">
        <router-link class="note_title"
          :to="`/reader/${note.title}`">
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
        console.error('notes list doesn\' exist in list');
      }
    },

    updateNotesBgImage() {
     import('@/assets/notes_cover/bg.jpg')
       .then((res) => {
         this.style.backgroundImage = `url(${res.default})`;
       });
    },
  },

  mounted() {
    console.log('notes node mounted');

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

.note_image {
  height: 30vw;
  background-repeat: no-repeat;
  background-size: cover;
}

.note_title {
  display: block;
  height: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
  color: white;
  font-size: 3vw;
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
  font-size: 1vw;
  text-align: start;
  text-indent: 5%;
  line-height: 30px;
}
</style>
