<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Play, FileText, CheckCircle, ArrowRight, Filter } from 'lucide-vue-next'
import api from '../services/api'

const router = useRouter()
const lessons = ref([])
const search = ref('')
const loading = ref(true)

const fetchLessons = async () => {
  try {
    const res = await api.getResources()
    lessons.value = res.data
    loading.value = false
  } catch (err) {
    console.error("Error connecting to MSU database", err)
  }
}

const filteredLessons = computed(() => {
  return lessons.value.filter(l => 
    l.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

const openLesson = (id) => {
  router.push({ name: 'DocumentViewer', params: { resourceId: id } })
}

onMounted(fetchLessons)
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
    <header class="flex flex-col md:flex-row justify-between md:items-end gap-6">
      <div>
        <h2 class="text-3xl font-black text-white italic uppercase tracking-tighter">
          Lesson <span class="text-pink-500">Library</span>
        </h2>
        <p class="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Available Learning Assets</p>
      </div>

      <div class="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 focus-within:border-blue-500/30 transition-all">
        <Search size="16" class="text-slate-500" />
        <input v-model="search" type="text" placeholder="SEARCH LESSONS..." 
          class="bg-transparent outline-none text-[10px] font-bold text-white uppercase tracking-widest w-40" />
      </div>
    </header>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 3" :key="n" class="soft-panel h-64 animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="lesson in filteredLessons" :key="lesson.id" 
        class="soft-panel group overflow-hidden flex flex-col">
        
        <div class="h-32 bg-[#020617] flex items-center justify-center relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-pink-600/5"></div>
          <Play v-if="lesson.resource_type === 'video'" size="24" class="text-blue-500/30 group-hover:text-blue-500 transition-colors" />
          <FileText v-else size="24" class="text-pink-500/30 group-hover:text-pink-500 transition-colors" />
          
          <div v-if="lesson.is_completed" class="absolute top-3 right-3 bg-emerald-500/20 p-1 rounded-full">
            <CheckCircle size="12" class="text-emerald-500" />
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2 block">
              {{ lesson.category || 'General' }}
            </span>
            <h4 class="text-sm font-bold text-white uppercase tracking-tight line-clamp-2 leading-tight">
              {{ lesson.title }}
            </h4>
          </div>
          
          <button @click="openLesson(lesson.id)" 
            class="mt-6 w-full py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center justify-center gap-2">
            Open Module <ArrowRight size="12" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>