<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LearningPath from './components/LearningPath.vue'
import StressMeter from './components/StressMeter.vue'
import AnalyticsView from './views/AnalyticsView.vue'
import LoginView from './views/LoginView.vue'

const isAuthenticated = ref(false)
const currentView = ref('learner')

const onLogin = (selectedRole) => {
  currentView.value = selectedRole
  isAuthenticated.value = true
}
</script>

<template>
  <div v-if="!isAuthenticated">
    <LoginView @login="onLogin" />
  </div>

  <div v-else class="flex min-h-screen bg-[#F0F4FF]">
    <Sidebar />
    <main class="flex-1 ml-20 md:ml-64 p-6 md:p-12">
      <header class="flex justify-between items-center mb-10">
        <div>
          <h2 class="text-4xl font-black text-brand-purple tracking-tighter uppercase">
            {{ currentView === 'learner' ? 'Hello, Protector!' : 'System Insights' }}
          </h2>
          <p class="text-slate-500 text-sm font-bold uppercase tracking-widest">Mindoro State University • ProtectEd</p>
        </div>
      </header>

      <div v-if="currentView === 'learner'" class="flex flex-col lg:flex-row gap-10 animate-in slide-in-from-bottom duration-700">
        <div class="flex-1">
          <LearningPath />
        </div>
        <div class="w-full lg:w-96">
          <StressMeter />
        </div>
      </div>

      <div v-else class="animate-in slide-in-from-right duration-700">
        <AnalyticsView />
      </div>
    </main>
  </div>
</template>