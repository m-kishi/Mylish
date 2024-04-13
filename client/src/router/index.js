// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ExamView from '../views/ExamView.vue';
import ScoreView from '../views/ScoreView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/exam',
    name: 'exam',
    component: ExamView,
  },
  {
    path: '/score',
    name: 'score',
    component: ScoreView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
