<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { X, ShieldAlert, BrainCircuit } from 'lucide-vue-next'
import api from '../services/api'

const props = defineProps(['resourceId'])
const router = useRouter()
const resource = ref(null)
const showExitModal = ref(false)

onMounted(async () => {
  try {
    const res = await api.getResources()
    // Ensure we parse the ID as an integer for comparison
    resource.value = res.data.find(r => r.id === parseInt(props.resourceId))
  } catch (err) {
    console.error("Failed to load document")
  }
})

const handleExit = () => {
  if (resource.value?.has_quiz) {
    router.push({ 
      name: 'ModuleQuiz', 
      params: { quizId: resource.value.quiz_id || resource.value.id } 
    })
  } else {
    router.push('/resources')
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-black flex flex-col h-screen w-screen overflow-hidden">
    <header class="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
      <div class="flex items-center gap-4">
        <button @click="showExitModal = true" class="p-2 bg-white/10 rounded-full text-white hover:bg-pink-600 transition-all">
          <X size="20" />
        </button>
        <h2 class="text-xs font-bold text-white uppercase tracking-widest">{{ resource?.title || 'Loading Module' }}</h2>
      </div>
      <div v-if="resource?.has_quiz" class="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
        <BrainCircuit size="12" class="text-blue-400" />
        <span class="text-[8px] font-black text-blue-400 uppercase tracking-widest">Quiz Integrated</span>
      </div>
    </header>

    <iframe v-if="resource?.content_url" :src="resource.content_url" class="w-full h-full border-none bg-white pt-20"></iframe>
    <div v-else class="flex-1 flex items-center justify-center text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em]">
      Establishing secure link to module...
    </div>

    <div v-if="showExitModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div class="bg-[#0f172a] border border-white/10 p-10 max-w-sm w-full text-center rounded-2xl shadow-2xl">
        <div class="mb-6">
          <BrainCircuit v-if="resource?.has_quiz" class="w-12 h-12 text-blue-500 mx-auto" />
          <ShieldAlert v-else class="w-12 h-12 text-pink-500 mx-auto" />
        </div>
        
        <h3 class="text-lg font-black text-white uppercase italic tracking-tighter">{{ resource?.has_quiz ? 'Begin Assessment?' : 'Close Module?' }}</h3>
        <p class="text-slate-500 text-[10px] font-medium uppercase tracking-widest mt-4 mb-8 leading-relaxed">
          {{ resource?.has_quiz ? 'Module complete. Please proceed to the quiz to receive credit.' : 'Your progress is being synced with your profile.' }}
        </p>
        
        <div class="flex flex-col gap-3">
          <button @click="handleExit" class="w-full py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
            {{ resource?.has_quiz ? 'Enter Quiz' : 'Sync and Exit' }}
          </button>
          <button @click="showExitModal = false" class="w-full py-4 bg-white/5 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            Stay in Module
          </button>
        </div>
      </div>
    </div>
  </div>
</template>