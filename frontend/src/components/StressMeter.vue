<script setup>
import { ref, watch } from 'vue'
import { HeartPulse, Wind } from 'lucide-vue-next'
import api from '../services/api'

const stressLevel = ref(30)
const userId = ref(1)

// Debounced API call to save stress logs to DB
let timeout
watch(stressLevel, (newVal) => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    const tip = newVal > 60 ? 'Take a break!' : 'Optimal vibes.'
    await api.saveStressLog({ userId: userId.value, value: newVal, tip })
  }, 1000)
})
</script>

<template>
  <div class="pop-3d bg-brand-purple p-8 rounded-[40px] text-black relative">
    <div class="flex justify-between items-center mb-6">
      <div class="px-3 py-1 bg-black rounded-lg border border-brand-cyan">
          <p class="text-[9px] font-black uppercase tracking-widest text-brand-cyan">AI Bio-Feed</p>
      </div>
      <HeartPulse class="w-6 h-6 text-brand-pink animate-pulse" />
    </div>
    
    <h3 class="text-2xl font-black mb-4 italic uppercase tracking-tighter">Current Mood</h3>
    
    <div class="bg-black/40 p-1 border-4 border-black rounded-2xl mb-6 shadow-inner">
      <input type="range" min="0" max="100" v-model="stressLevel" class="w-full h-4 bg-transparent appearance-none cursor-pointer accent-brand-cyan">
    </div>
    
    <div class="bg-white p-5 rounded-2xl border-4 border-black shadow-[6px_6px_0_0_black] text-black">
      <p class="text-[11px] leading-tight font-bold">
        <span class="block font-black text-brand-purple uppercase mb-1">Status:</span>
        {{ stressLevel > 60 ? 'High tension detected. Logs updated for AI tracking.' : 'System optimal.' }}
      </p>
    </div>
  </div>
</template>