import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import ResourceLibrary from '../components/ResourceLibrary.vue' 
import LearningPath from '../components/LearningPath.vue'
import StressMeter from '../components/StressMeter.vue'
import RewardSystem from '../components/RewardSystem.vue'
import DocumentViewer from '../views/DocumentViewer.vue' // Import the new view

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/resources', component: ResourceLibrary }, 
  { path: '/learning-path', component: LearningPath },
  { path: '/stress-meter', component: StressMeter },
  { path: '/rewards', component: RewardSystem },
  { path: '/analytics', component: AnalyticsView },
  
  // New route for dedicated full-screen document viewing
  { 
    path: '/view-document/:resourceId', 
    name: 'DocumentViewer', 
    component: DocumentViewer,
    props: true 
  },
  
  { 
    path: '/game/:id', 
    name: 'GamePlayer', 
    component: () => import('../views/GameView.vue'),
    props: true 
  },
  
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