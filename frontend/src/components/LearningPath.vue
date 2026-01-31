<script setup>
import { onMounted, ref, computed } from 'vue'
import { Lock, CheckCircle2, PlayCircle, Map as MapIcon } from 'lucide-vue-next'
import api from '../services/api'

const modules = ref([])

onMounted(async () => {
  try {
    const res = await api.getLearningPath(1)
    modules.value = res.data.sort((a, b) => a.order_index - b.order_index)
  } catch (e) { console.error(e) }
})

// Generate SVG Path coordinates based on module positions
const pathData = computed(() => {
  if (modules.value.length < 2) return ""
  return modules.value.reduce((path, m, i) => {
    const x = m.pos_left
    const y = m.pos_top
    return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`
  }, "")
})
</script>

<template>
  <div class="relative w-full h-[600px] bg-slate-50 rounded-[40px] border-4 border-slate-200 overflow-hidden shadow-inner p-10">
    <div class="absolute top-6 left-8 flex items-center space-x-2 opacity-50">
      <MapIcon class="w-5 h-5" />
      <span class="text-xs font-bold uppercase tracking-widest">Learning Adventure</span>
    </div>

    <svg class="absolute inset-0 w-full h-full pointer-events-none">
      <path :d="pathData" 
            fill="none" 
            stroke="#6366f1" 
            stroke-width="4" 
            stroke-dasharray="12" 
            class="opacity-30" />
    </svg>

    <div v-for="m in modules" :key="m.id" 
         :style="{ top: m.pos_top, left: m.pos_left }" 
         class="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
      
      <div :class="[
        m.status === 'locked' ? 'grayscale opacity-60' : 'hover:scale-110 hover:shadow-brand-cyan/50',
        'w-20 h-20 rounded-3xl p-1 border-4 border-white shadow-xl transition-all relative bg-white flex items-center justify-center'
      ]">
        <img :src="`https://api.dicebear.com/7.x/${m.bot_type}/svg?seed=${m.id}`" class="w-14 h-14" />
        
        <div v-if="m.status === 'completed'" class="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 shadow-lg">
          <CheckCircle2 class="w-4 h-4 text-white" />
        </div>
        <div v-if="m.status === 'locked'" class="absolute inset-0 bg-slate-200/20 rounded-3xl flex items-center justify-center">
          <Lock class="w-5 h-5 text-slate-400" />
        </div>
      </div>

      <div class="absolute top-24 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
        <p class="text-[10px] font-black uppercase text-slate-600 tracking-tighter">{{ m.title }}</p>
      </div>
    </div>
  </div>
</template>