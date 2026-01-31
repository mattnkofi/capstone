<script setup>
import { ref, onMounted, computed } from 'vue'
import { TrendingUp, BookOpen, ChevronRight } from 'lucide-vue-next'
import api from '../services/api' //
import StressMeter from '../components/StressMeter.vue' //

const modules = ref([])
const userId = 1 // Mapping to User 1 in your SQL dump

const loadData = async () => {
  try {
    const res = await api.getLearningPath(userId)
    modules.value = res.data // Set data from database
  } catch (err) {
    console.error("Database connection failed", err)
  }
}

// Calculate progress percentage dynamically from database status
const progress = computed(() => {
  if (modules.value.length === 0) return 0
  const completed = modules.value.filter(m => m.status === 'completed').length
  return Math.round((completed / modules.value.length) * 100)
})

onMounted(loadData)
</script>

<template>
  <div class="p-6 space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <TrendingUp class="w-6 h-6 text-blue-600 mb-4" />
        <h3 class="text-3xl font-black text-slate-800">{{ progress }}%</h3>
        <p class="text-xs text-slate-500 font-bold uppercase">Database Progress</p>
        <div class="w-full bg-slate-100 h-3 rounded-full mt-4 overflow-hidden">
          <div class="bg-blue-500 h-full transition-all duration-1000" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      <StressMeter />
    </div>

    <div class="space-y-4">
      <h3 class="font-black text-slate-800 text-lg italic">Your Curriculum</h3>
      <div v-for="mod in modules" :key="mod.id" 
           class="p-5 bg-white rounded-2xl border border-slate-100 flex items-center justify-between hover:border-blue-500 transition-all">
        <div class="flex items-center space-x-4">
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', mod.status === 'completed' ? 'bg-green-50' : 'bg-slate-50']">
            <BookOpen :class="['w-6 h-6', mod.status === 'completed' ? 'text-green-600' : 'text-slate-400']" />
          </div>
          <div>
            <h4 class="font-bold text-slate-800">{{ mod.title }}</h4>
            <p class="text-[10px] font-bold text-slate-400 uppercase">{{ mod.category }}</p>
          </div>
        </div>
        <span class="text-[10px] font-black uppercase text-slate-400">{{ mod.status || 'Locked' }}</span>
      </div>
    </div>
  </div>
</template>