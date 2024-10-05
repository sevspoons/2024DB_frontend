import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/welcome.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/Welcome'
  },
  {
    path: '/Welcome',
    name: 'About',
    component: Welcome,
  },
  // 更多的路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;