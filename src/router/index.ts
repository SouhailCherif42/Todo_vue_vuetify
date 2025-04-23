import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import TaskListView from '@/views/TaskListView.vue';

const routes = [
  { path: '/', name: 'Accueil', component: Home },
  { path: '/taches', name: 'Tâches', component: TaskListView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
