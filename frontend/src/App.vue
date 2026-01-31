<script setup>
import { ref, onMounted, provide } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LearningPath from './components/LearningPath.vue'
import StressMeter from './components/StressMeter.vue'
import AnalyticsView from './views/AnalyticsView.vue'
import LoginView from './views/LoginView.vue'
import { Zap, ZapOff, Shield, Activity } from 'lucide-vue-next'
import axios from 'axios'

const isAuthenticated = ref(false)
const currentView = ref('learner')
const isAdaptiveMode = ref(false)
const userId = ref(1) // Static for demo; replace with user.id from login

// Provide adaptive state to all child components
provide('isAdaptiveMode', isAdaptiveMode)

const onLogin = (selectedRole) => {
  currentView.value = selectedRole
  isAuthenticated.value = true
}

const toggleAdaptive = async () => {
  isAdaptiveMode.value = !isAdaptiveMode.value
  try {
    // Sync preference with MySQL backend
    await axios.post('http://localhost:3000/api/adaptive/toggle', {
      userId: userId.value,
      enabled: isAdaptiveMode.value
    })
  } catch (err) {
    console.error('Sync failed:', err)
  }
}

// Check initial adaptive state from database on load
onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      const res = await axios.get(`http://localhost:3000/api/adaptive/status/${userId.value}`)
      isAdaptiveMode.value = res.data.adaptiveMode
    } catch (e) {
      console.error('State fetch failed')
    }
  }
})
</script>

<template>
  <div v-if="!isAuthenticated">
    <LoginView @login="onLogin" />
  </div>

  <div v-else :class="[isAdaptiveMode ? 'bg-slate-950 text-white' : 'bg-[#F0F4FF] text-slate-900', 'flex min-h-screen transition-colors duration-700']">
    <Sidebar :class="{ 'opacity-20 grayscale': isAdaptiveMode && currentView === 'learner' }" />
    
    <main class="flex-1 ml-20 md:ml-64 p-6 md:p-12">
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div class="flex items-center space-x-2 mb-1">
            <Shield v-if="currentView === 'learner'" class="w-5 h-5 text-brand-purple" />
            <Activity v-else class="w-5 h-5 text-brand-cyan" />
            <p :class="[isAdaptiveMode ? 'text-slate-400' : 'text-slate-500', 'text-[10px] font-black uppercase tracking-[0.3em]']">
              Mindoro State University • ProtectEd
            </p>
          </div>
          <h2 :class="[isAdaptiveMode ? 'text-white' : 'text-brand-purple', 'text-4xl font-black tracking-tighter uppercase transition-colors']">
            {{ currentView === 'learner' ? 'Hello, Protector!' : 'System Insights' }}
          </h2>
        </div>

        <button 
          @click="toggleAdaptive"
          :class="[
            isAdaptiveMode 
              ? 'bg-brand-cyan text-brand-purple border-brand-cyan shadow-[0_0_20px_rgba(0,255,240,0.3)]' 
              : 'bg-white text-slate-400 border-slate-200 hover:border-brand-purple',
            'flex items-center space-x-3 px-6 py-3 rounded-2xl border-b-4 transition-all duration-500 font-black text-[10px] tracking-widest group'
          ]"
        >
          <component :is="isAdaptiveMode ? Zap : ZapOff" class="w-4 h-4" />
          <span>{{ isAdaptiveMode ? 'ADAPTIVE FOCUS ON' : 'STANDARD INTERFACE' }}</span>
        </button>
      </header>

      <div v-if="currentView === 'learner'" class="flex flex-col lg:flex-row gap-10 animate-in slide-in-from-bottom duration-700">
        <div class="flex-1">
          <LearningPath :adaptive="isAdaptiveMode" />
        </div>
        
        <div :class="['w-full lg:w-96 transition-all duration-700', isAdaptiveMode ? 'scale-95 opacity-80' : 'scale-100']">
          <StressMeter />
          
          <div v-if="isAdaptiveMode" class="mt-6 p-6 bg-white/5 border border-white/10 rounded-[32px] animate-pulse">
            <p class="text-brand-cyan font-black text-[10px] uppercase mb-2">Focus Mode Tip</p>
            <p class="text-xs text-slate-300">Visual complexity has been reduced to help you focus on the current module.</p>
          </div>
        </div>
      </div>

      <div v-else class="animate-in slide-in-from-right duration-700">
        <AnalyticsView />
      </div>
    </main>
  </div>
</template>

<style>
/* Global smoothing for adaptive transitions */
* {
  transition-property: background-color, border-color, color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}

/* Custom scrollbar for focus mode */
.bg-slate-950::-webkit-scrollbar {
  width: 8px;
}
.bg-slate-950::-webkit-scrollbar-track {
  background: #0f172a;
}
.bg-slate-950::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
</style>