import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

if (process.env.NODE_ENV === 'development') {
  Vue.use(Router);
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/catalog/:category/:page',
      name: 'catalog',
      component: () => import('./views/Catalog.vue'),
      props: true,
    },
    {
      path: '/read/:route/:filename',
      name: 'read',
      component: () => import('./views/Reader.vue'),
      props: true,
    },
    {
      path: '/view/:route/:filename',
      name: 'view',
      component: () => import('./views/Viewer.vue'),
      props: true,
    },
  ],
});
