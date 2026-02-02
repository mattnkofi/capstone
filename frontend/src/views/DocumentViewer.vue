<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { X, ShieldAlert, CheckCircle } from 'lucide-vue-next'
import api from '../services/api'

const props = defineProps(['resourceId'])
const router = useRouter()
const resource = ref(null)
const showExitModal = ref(false)

onMounted(async () => {
  const res = await api.getResources()
  resource.value = res.data.find(r => r.id === parseInt(props.resourceId))
})
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-black flex flex-col h-screen w-screen font-gothic overflow-hidden">
    <header class="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
      <div class="flex items-center gap-4">
        <button @click="showExitModal = true" class="p-2 bg-white/10 rounded-full text-white hover:bg-pink-600 transition-all">
          <X size="20" />
        </button>
        <h2 class="text-xs font-bold text-white uppercase tracking-widest">{{ resource?.title }}</h2>
      </div>
    </header>

    <iframe v-if="resource?.content_url" :src="resource.content_url" class="w-full h-full border-none bg-white"></iframe>
    <div v-else class="flex items-center justify-center h-full text-slate-500 text-[10px] uppercase font-bold tracking-widest">
      Loading secure content...
    </div>

    <div v-if="showExitModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div class="soft-panel bg-[#0f172a] p-10 max-w-sm w-full text-center">
        <ShieldAlert class="w-12 h-12 text-pink-500 mx-auto mb-6" />
        <h3 class="text-lg font-black text-white uppercase italic tracking-tighter">Exit Lesson?</h3>
        <p class="text-slate-500 text-[10px] font-medium uppercase tracking-widest mt-4 mb-8">Your current progress will be saved.</p>
        
        <div class="flex gap-3">
          <button @click="showExitModal = false" class="flex-1 py-3 bg-white/5 text-slate-400 rounded-lg text-[9px] font-bold uppercase tracking-widest">Back</button>
          <button @click="router.push('/resources')" class="flex-1 py-3 bg-blue-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest">Exit</button>
        </div>
      </div>
    </div>
  </div>
</template>