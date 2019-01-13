import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('./views/Notes.vue'),
    },
    {
      path: '/read/:filename',
      name: 'notes_reader',
      component: () => import('./views/Notes_reader.vue'),
    },
  ],
});
