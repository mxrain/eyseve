import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import EditPage from '../components/EditPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: App,
    },
    {
      path: '/edit/:type/:id',
      component: EditPage,
    },
  ],
});

export default router;