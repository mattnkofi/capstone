<script setup>
import { ref, onMounted, computed } from 'vue'
import { TrendingUp, BookOpen, ChevronRight, Activity } from 'lucide-vue-next'
import api from '../services/api'
import StressMeter from '../components/StressMeter.vue'

const modules = ref([])
const userId = 1

const loadData = async () => {
  try {
    const res = await api.getLearningPath(userId)
    modules.value = res.data
  } catch (err) {
    console.error("Database connection failed", err)
  }
}

const progress = computed(() => {
  if (modules.value.length === 0) return 0
  const completed = modules.value.filter(m => m.status === 'completed').length
  return Math.round((completed / modules.value.length) * 100)
})

onMounted(loadData)
</script>

<template>
  <div class="p-8 max-w-7xl mx-auto space-y-10">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-3xl font-black text-slate-800 tracking-tight italic uppercase">System <span class="text-gradient">Overview</span></h2>
        <p class="text-slate-500 font-medium mt-1">Welcome back, Matt. Here's your current standing.</p>
      </div>
      <div class="bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/40 shadow-sm hidden md:flex items-center space-x-3">
        <Activity class="w-4 h-4 text-emerald-500" />
        <span class="text-[10px] font-black uppercase text-slate-500">System Live</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="glass-card p-8 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-100/50 rounded-full blur-3xl group-hover:bg-blue-200/50 transition-colors"></div>
        <div class="relative z-10">
          <div class="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <TrendingUp class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="text-5xl font-black text-slate-900 tracking-tighter">{{ progress }}%</h3>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Course Completion</p>
          <div class="w-full bg-slate-100 h-2.5 rounded-full mt-8 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-1000" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </div>
      
      <StressMeter class="md:col-span-2" />
    </div>

    <div class="space-y-6">
      <div class="flex items-center justify-between px-2">
        <h3 class="text-xl font-black text-slate-800 italic uppercase">Your Curriculum</h3>
        <button class="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">View Detailed Path</button>
      </div>

      <div class="grid gap-4">
        <div v-for="mod in modules" :key="mod.id" 
             class="glass-card p-5 flex items-center justify-between group cursor-pointer border-transparent hover:border-blue-100">
          <div class="flex items-center space-x-6">
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-all',
              mod.status === 'completed' ? 'bg-emerald-50 group-hover:bg-emerald-100' : 'bg-slate-50 group-hover:bg-slate-100'
            ]">
              <BookOpen :class="['w-6 h-6', mod.status === 'completed' ? 'text-emerald-500' : 'text-slate-400']" />
            </div>
            <div>
              <h4 class="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{{ mod.title }}</h4>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">{{ mod.category }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-6">
            <span :class="[
              'px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border',
              mod.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
            ]">
              {{ mod.status || 'Locked' }}
            </span>
            <ChevronRight class="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-all group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>