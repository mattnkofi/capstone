import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import ResourceLibrary from '../components/ResourceLibrary.vue' 
import LearningPath from '../components/LearningPath.vue'
import StressMeter from '../components/StressMeter.vue'
import RewardSystem from '../components/RewardSystem.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/resources', component: ResourceLibrary }, 
  { path: '/learning-path', component: LearningPath },
  { path: '/stress-meter', component: StressMeter },
  { path: '/rewards', component: RewardSystem },
  { path: '/analytics', component: AnalyticsView },
  
  // FIXED: Ensure GamePlayer can receive the ID from LearningPath
  { 
    path: '/game/:id', 
    name: 'GamePlayer', 
    component: () => import('../views/GameView.vue'),
    props: true 
  },
  
  // FIXED: Added :resourceId so the creator knows which file the quiz belongs to
  { 
    path: '/admin/create-quiz/:resourceId', 
    name: 'QuizCreator', 
    component: () => import('../components/QuizCreator.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router