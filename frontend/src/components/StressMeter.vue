<script setup>
import { Wind, HeartPulse, Sparkles, ShieldCheck } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stress = ref(40)
const userId = 1
const isAdaptive = ref(false)

const checkAdaptiveStatus = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/adaptive/status/${userId}`)
    isAdaptive.value = res.data.adaptiveMode
  } catch (e) { console.error(e) }
}

const saveStressEntry = async () => {
  const tip = stress.value > 70 ? 'High Stress: Launching Focus Mode.' : 'Optimal levels detected.'
  try {
    const res = await axios.post('http://localhost:3000/api/wellness/stress', {
      userId,
      value: stress.value,
      tip
    })
    isAdaptive.value = res.data.adaptiveActive
  } catch (e) { console.error(e) }
}

onMounted(checkAdaptiveStatus)
</script>

<template>
  <div :class="[isAdaptive ? 'bg-slate-900 border-brand-cyan' : 'bg-brand-purple border-black/20', 'p-8 rounded-[40px] text-white transition-all duration-700 border-b-8 shadow-2xl']">
    <div class="flex justify-between mb-6">
      <div class="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
        <HeartPulse :class="isAdaptive ? 'text-brand-cyan' : 'text-brand-pink'" class="w-4 h-4" />
        <span class="text-[10px] font-black uppercase tracking-widest">
          {{ isAdaptive ? 'Adaptive Focus Active' : 'Standard Wellness' }}
        </span>
      </div>
      <ShieldCheck v-if="isAdaptive" class="w-5 h-5 text-brand-cyan" />
      <Sparkles v-else class="w-5 h-5 text-brand-cyan" />
    </div>

    <input type="range" v-model="stress" @change="saveStressEntry" class="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-cyan mb-6">

    <div class="bg-white/10 p-5 rounded-3xl border border-white/10">
      <div class="flex items-start space-x-4">
        <Wind class="w-5 h-5 text-brand-cyan" />
        <div>
          <p class="text-[10px] font-black text-brand-cyan uppercase">System Response</p>
          <p class="text-xs font-medium">{{ stress > 70 ? 'Reducing interface noise to help you focus.' : 'Great job maintaining balance!' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>