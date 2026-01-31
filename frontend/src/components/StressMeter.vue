<script setup>
import { ref } from 'vue'
import api from '../services/api' //

const stressLevel = ref(45)
const status = ref('Connected')

const syncWithDB = async () => {
  status.value = 'Saving...'
  try {
    const tip = stressLevel.value > 70 ? 'High tension detected.' : 'System optimal.'
    await api.saveStressLog({ userId: 1, value: stressLevel.value, tip }) //
    status.value = 'Data Saved'
  } catch (err) {
    status.value = 'Error'
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <div class="flex justify-between items-center mb-4">
      <p class="text-xs font-black uppercase text-slate-500">AI Stress Meter</p>
      <span :class="status === 'Error' ? 'text-red-500' : 'text-blue-500'" class="text-[10px] font-bold uppercase tracking-tighter">{{ status }}</span>
    </div>
    <input type="range" v-model="stressLevel" @change="syncWithDB" 
           class="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500">
    <p class="mt-4 text-[10px] font-bold text-slate-400 uppercase">Values logged to SQL: {{ stressLevel }}</p>
  </div>
</template>