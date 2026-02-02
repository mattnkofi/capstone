<script setup>
import { ref } from 'vue'
import { HeartPulse, BrainCircuit, CheckCircle2 } from 'lucide-vue-next'
import api from '../services/api'

const user = JSON.parse(localStorage.getItem('user')) || { id: 1 }
const stressLevel = ref(50)
const saved = ref(false)

const logStress = async () => {
  try {
    await api.saveStressLog({ userId: user.id, stressValue: stressLevel.value })
    saved.value = true
    setTimeout(() => saved.value = false, 3000)
  } catch (err) {
    console.error("Failed to save stress log")
  }
}
</script>

<template>
  <div class="panel-elevated p-10 bg-[#0f172a]">
    <div class="flex justify-between items-center mb-10">
      <div class="flex items-center gap-5">
        <div class="p-3 bg-pink-900/20 rounded-xl"><HeartPulse class="w-8 h-8 text-pink-600" /></div>
        <h4 class="text-xl font-black text-white italic uppercase tracking-tighter">Wellness Tracker</h4>
      </div>
      <button @click="logStress" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-pink-600 transition-all">
        {{ saved ? 'LOGGED' : 'LOG DATA' }}
      </button>
    </div>

    <div class="space-y-8">
      <input type="range" v-model="stressLevel" class="w-full h-2 bg-[#020617] rounded-full appearance-none accent-blue-600">
      <div class="bg-[#020617] p-8 rounded-2xl border border-white/5 flex items-center justify-between">
        <div class="text-center">
          <p class="text-[9px] font-black text-slate-500 uppercase">Current Level</p>
          <p class="text-4xl font-black text-white tracking-tighter">{{ stressLevel }}</p>
        </div>
        <BrainCircuit class="w-8 h-8 text-blue-500 opacity-20" />
      </div>
    </div>
  </div>
</template>