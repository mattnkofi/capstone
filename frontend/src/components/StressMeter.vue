<script setup>
import { ref } from 'vue'
import { HeartPulse, BrainCircuit } from 'lucide-vue-next'
import api from '../services/api'

const stressLevel = ref(45)
const status = ref('Online')

const syncWithDB = async () => {
  status.value = 'Syncing...'
  try {
    const tip = stressLevel.value > 70 ? 'High tension detected. Breather recommended.' : 'Optimal focus state.'
    await api.saveStressLog({ userId: 1, value: stressLevel.value, tip })
    status.value = 'Data Saved'
    setTimeout(() => { status.value = 'Online' }, 2000)
  } catch (err) {
    status.value = 'Sync Error'
  }
}
</script>

<template>
  <div class="glass-card p-8 flex flex-col justify-between">
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center space-x-4">
        <div class="p-3 bg-pink-50 rounded-2xl">
          <HeartPulse class="w-6 h-6 text-pink-500" />
        </div>
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Wellness Monitor</p>
          <p class="text-sm font-bold text-slate-700">AI Stress Analysis</p>
        </div>
      </div>
      <span :class="[status.includes('Error') ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-blue-50 text-blue-500 border-blue-100']" class="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border tracking-widest transition-all">
        {{ status }}
      </span>
    </div>

    <div class="space-y-8">
      <div class="relative group">
        <input 
          type="range" v-model="stressLevel" @change="syncWithDB" 
          class="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600 transition-all"
        >
        <div class="flex justify-between mt-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">
          <span>Low Stress</span>
          <span>Moderate</span>
          <span>High Activity</span>
        </div>
      </div>

      <div class="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-100 flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <div class="text-center">
            <p class="text-[9px] font-black text-slate-400 uppercase">Level</p>
            <p class="text-3xl font-black text-slate-800 tracking-tighter">{{ stressLevel }}</p>
          </div>
          <div class="h-10 w-[1px] bg-slate-200"></div>
          <div>
            <p class="text-[9px] font-black text-slate-400 uppercase">Analysis Tip</p>
            <p class="text-xs font-bold text-blue-600 italic">
              {{ stressLevel > 70 ? 'Recommendation: Take a short meditation break.' : 'System detects optimal cognitive performance.' }}
            </p>
          </div>
        </div>
        <BrainCircuit class="w-6 h-6 text-blue-500/30" />
      </div>
    </div>
  </div>
</template>