import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import ResourceLibrary from '../components/ResourceLibrary.vue' // Ensure this is imported
import LearningPath from '../components/LearningPath.vue'
import StressMeter from '../components/StressMeter.vue'
import RewardSystem from '../components/RewardSystem.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/resources', component: ResourceLibrary }, // Path for sidebar link
  { path: '/learning-path', component: LearningPath },
  { path: '/stress-meter', component: StressMeter },
  { path: '/rewards', component: RewardSystem },
  { path: '/analytics', component: AnalyticsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router