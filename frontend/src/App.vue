<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LearningPath from './components/LearningPath.vue'
import StressMeter from './components/StressMeter.vue'
import AnalyticsView from './views/AnalyticsView.vue'
// Adding the new components required by the project title approval
import RiskAlert from './components/RiskAlert.vue'
import ResourceLibrary from './components/ResourceLibrary.vue'
import RewardSystem from './components/RewardSystem.vue'

const currentView = ref('learner')
// Initializing stressLevel to track AI-generated risk alerts
const stressLevel = ref(30) 
</script>

<template>
  <div class="flex min-h-screen bg-[#E0E7FF] p-6">
    <Sidebar @change-view="(v) => currentView = v" />

    <main class="flex-1 ml-72">
      <header class="flex justify-between items-end mb-12">
        <div>
          <div class="inline-block px-3 py-1 bg-brand-pink border-2 border-black rounded-lg mb-4 shadow-[4px_4px_0px_0px_black]">
            <p class="text-[10px] font-black text-white uppercase tracking-widest">Active Session</p>
          </div>
          <h2 class="text-5xl font-black text-black tracking-tighter uppercase italic">
            {{ currentView === 'learner' ? 'Status: Protected' : 'Data Terminal' }}
          </h2>
        </div>
        
        <div class="flex bg-black p-1.5 rounded-[20px] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
           <button @click="currentView = 'learner'" 
                   :class="currentView === 'learner' ? 'bg-brand-cyan text-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]' : 'bg-transparent text-white'" 
                   class="px-8 py-3 rounded-[15px] text-[10px] font-black uppercase transition-all">
             Manual
           </button>
           <button @click="currentView = 'analytics'" 
                   :class="currentView === 'analytics' ? 'bg-brand-cyan text-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]' : 'bg-transparent text-white'" 
                   class="px-8 py-3 rounded-[15px] text-[10px] font-black uppercase transition-all">
             Analytics
           </button>
        </div>
      </header>

      <div v-if="currentView === 'learner'" class="grid grid-cols-12 gap-10">
        <div class="col-span-12 xl:col-span-7">
          <LearningPath />
        </div>
        
        <div class="col-span-12 xl:col-span-5 space-y-8">
          <RiskAlert v-if="stressLevel > 80" /> 
          
          <StressMeter v-model="stressLevel" />
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceLibrary />
            <RewardSystem />
          </div>

          <div class="pop-3d p-8 rounded-[40px]">
             <h4 class="font-black text-black text-xs uppercase mb-6 tracking-widest flex justify-between">
                Progress <span>70%</span>
             </h4>
             <div class="h-8 w-full bg-slate-100 border-4 border-black rounded-xl overflow-hidden p-1 shadow-inner">
                <div class="bg-gradient-to-r from-brand-cyan to-brand-purple h-full rounded-md border-r-2 border-black" style="width: 70%"></div>
             </div>
             <p class="mt-4 text-[9px] font-bold text-slate-400 uppercase italic text-center">Next Milestone: VAWC Prevention</p>
          </div>
        </div>
      </div>

      <div v-else>
        <AnalyticsView />
      </div>
    </main>
  </div>
</template>