import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      alias: '/landing',
      name: 'landing',
      component: () => import('./components/landing/LandingPage.vue'),
    },
    {
      path: '/page/:name',
      name: 'page',
      component: () => import('./components/Page.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./components/Add.vue'),
    },
  ],
});
export default router;
