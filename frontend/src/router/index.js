import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Dashboard from '../views/Dashboard.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import ResourceLibrary from '../components/ResourceLibrary.vue' 
import LearningPath from '../components/LearningPath.vue'
import StressMeter from '../components/StressMeter.vue'
import RewardSystem from '../components/RewardSystem.vue'
import DocumentViewer from '../views/DocumentViewer.vue' 

const routes = [
  { path: '/', name: 'Landing', component: LandingView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard, 
    meta: { requiresAuth: true } 
  },
  { path: '/resources', component: ResourceLibrary, meta: { requiresAuth: true } },
  { path: '/learning-path', component: LearningPath, meta: { requiresAuth: true } },
  { path: '/stress-meter', component: StressMeter, meta: { requiresAuth: true } },
  { path: '/rewards', component: RewardSystem, meta: { requiresAuth: true } },
  { path: '/analytics', component: AnalyticsView, meta: { requiresAuth: true } },
  { 
    path: '/view-document/:resourceId', 
    name: 'DocumentViewer', 
    component: DocumentViewer, 
    props: true, 
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router