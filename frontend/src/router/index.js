import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/login', name: 'login', component: LoginView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;