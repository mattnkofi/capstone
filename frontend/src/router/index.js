import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import LearningPath from '../components/LearningPath.vue'
import StressMeter from '../components/StressMeter.vue'
import ResourceLibrary from '../components/ResourceLibrary.vue'
import RewardSystem from '../components/RewardSystem.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/learning-path', component: LearningPath },
  { path: '/analytics', component: AnalyticsView },
  { path: '/stress-meter', component: StressMeter },
  { path: '/resources', component: ResourceLibrary },
  { path: '/rewards', component: RewardSystem }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router