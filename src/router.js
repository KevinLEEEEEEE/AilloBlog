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
      path: '/notes/:page',
      name: 'notes',
      component: () => import('./views/Notes.vue'),
    },
    {
      path: '/read/:route/:filename',
      name: 'read',
      component: () => import('./views/Reader.vue'),
    },
  ],
});
