<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { X, Download, FileText, ChevronLeft, ShieldCheck } from 'lucide-vue-next'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const resource = ref(null)
const loading = ref(true)

const fetchResource = async () => {
  try {
    const res = await api.getResources()
    resource.value = res.data.find(r => r.id == route.params.resourceId)
  } catch (err) {
    console.error("Document load failed", err)
  } finally {
    loading.value = false
  }
}

const getDownloadUrl = (url) => {
  const filename = url.split('/').pop()
  return `http://localhost:3000/api/resources/download/${filename}`
}

onMounted(fetchResource)
</script>

<template>
  <div class="h-screen w-full flex flex-col bg-slate-900">
    
    <header class="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-50 shadow-md">
      <div class="flex items-center space-x-4">
        <button @click="router.back()" class="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500 group">
          <ChevronLeft class="w-6 h-6" />
        </button>
        
        <div class="flex items-center space-x-3">
          <div class="bg-blue-600 p-2 rounded-lg">
            <FileText class="w-5 h-5 text-white" />
          </div>
          <h1 class="text-xs font-black uppercase tracking-widest text-slate-800">
            {{ resource?.title || 'Loading Intelligence...' }}
          </h1>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <a v-if="resource" :href="getDownloadUrl(resource.content_url)" download 
           class="flex items-center space-x-2 px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
          <Download class="w-4 h-4" />
          <span>Download</span>
        </a>
        <button @click="router.push('/resources')" class="p-2 hover:bg-rose-50 text-rose-500 rounded-xl transition-all">
          <X class="w-6 h-6" />
        </button>
      </div>
    </header>

    <main class="flex-1 w-full bg-slate-800 relative">
      <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-[10px] font-black text-white uppercase tracking-[0.3em]">Opening Secure Asset</p>
      </div>

      <iframe 
        v-if="resource"
        :src="resource.content_url" 
        class="w-full h-full border-none"
        allow="fullscreen"
      ></iframe>
    </main>
  </div>
</template>