<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LearningPath from './components/LearningPath.vue'
import StressMeter from './components/StressMeter.vue'
import AnalyticsView from './views/AnalyticsView.vue'

const currentView = ref('learner') // Toggle between 'learner' and 'analytics'
</script>

<template>
  <div class="flex min-h-screen bg-[#F0F4FF]">
    <Sidebar @change-view="(v) => currentView = v" />

    <main class="flex-1 ml-20 md:ml-64 p-6 md:p-12">
      <header class="flex justify-between items-center mb-10">
        <div>
          <h2 class="text-4xl font-black text-brand-purple tracking-tighter uppercase">
            {{ currentView === 'learner' ? 'Hello, Protector!' : 'System Insights' }}
          </h2>
          <p class="text-slate-500 text-sm font-bold uppercase tracking-widest">Mindoro State University • Project ProtectEd</p>
        </div>
        <div class="flex space-x-4">
           <button @click="currentView = 'learner'" :class="currentView === 'learner' ? 'bg-brand-purple text-white' : 'bg-white text-slate-400'" class="px-6 py-2 rounded-2xl text-xs font-black uppercase transition shadow-sm">Learner</button>
           <button @click="currentView = 'analytics'" :class="currentView === 'analytics' ? 'bg-brand-purple text-white' : 'bg-white text-slate-400'" class="px-6 py-2 rounded-2xl text-xs font-black uppercase transition shadow-sm">AI Analytics</button>
        </div>
      </header>

      <div v-if="currentView === 'learner'" class="flex flex-col lg:flex-row gap-10">
        <div class="flex-1">
          <LearningPath />
        </div>
        <div class="w-full lg:w-96 space-y-8">
          <StressMeter />
          <div class="bg-white p-8 rounded-[40px] shadow-sm border-b-4 border-slate-200">
             <h4 class="font-black text-brand-purple text-xs uppercase mb-4 tracking-widest">Daily Progress</h4>
             <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="bg-brand-cyan h-full" style="width: 70%"></div>
             </div>
          </div>
        </div>
      </div>

      <div v-else>
        <AnalyticsView />
      </div>
    </main>
  </div>
</template>