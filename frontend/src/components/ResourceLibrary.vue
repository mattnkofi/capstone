<script setup>
import { ref, onMounted } from 'vue'
import { BookOpen, Video, FileText, Upload, X } from 'lucide-vue-next'
import api from '../services/api'

const resources = ref([])
const selectedFile = ref(null)
const uploadTitle = ref('')
const selectedViewUrl = ref(null)

const fetchResources = async () => {
  const res = await api.getResources()
  resources.value = res.data
}

const handleFileUpload = (e) => {
  selectedFile.value = e.target.files[0]
}

const submitUpload = async () => {
  if (!selectedFile.value || !uploadTitle.value) return
  
  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('title', uploadTitle.value)
  formData.append('resource_type', 'document')
  formData.append('target_age_group', 'All Ages')

  try {
    await api.uploadResource(formData)
    uploadTitle.value = ''
    selectedFile.value = null
    fetchResources()
  } catch (err) {
    console.error("Upload failed", err)
  }
}

const openViewer = (url) => {
  selectedViewUrl.value = url
}

onMounted(fetchResources)
</script>

<template>
  <div class="pop-3d p-6 bg-white rounded-[40px] relative">
    <div v-if="selectedViewUrl" class="absolute inset-0 z-50 bg-white rounded-[40px] p-4 flex flex-col border-4 border-black">
      <div class="flex justify-between mb-2">
        <h4 class="font-black text-xs uppercase">Document Viewer</h4>
        <button @click="selectedViewUrl = null" class="bg-brand-pink p-1 border-2 border-black rounded shadow-[2px_2px_0_0_black]">
          <X class="w-4 h-4 text-black" />
        </button>
      </div>
      <iframe :src="selectedViewUrl" class="flex-1 w-full border-2 border-black rounded-xl"></iframe>
    </div>

    <div class="flex items-center justify-between mb-6">
      <h3 class="font-black text-brand-purple uppercase tracking-widest text-xs">Knowledge Base</h3>
      <BookOpen class="w-4 h-4 text-brand-cyan" />
    </div>

    <div class="mb-6 p-4 border-4 border-black border-dashed rounded-2xl bg-slate-50">
      <input v-model="uploadTitle" type="text" placeholder="Title..." class="w-full mb-2 p-1 border-2 border-black rounded text-xs" />
      <div class="flex gap-2">
        <input type="file" @change="handleFileUpload" class="text-[10px] flex-1" />
        <button @click="submitUpload" class="bg-brand-cyan px-3 py-1 border-2 border-black rounded-lg shadow-[3px_3px_0_0_black] active:translate-y-1 active:shadow-none transition-all">
          <Upload class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
      <div v-for="res in resources" :key="res.id" @click="openViewer(res.content_url)"
         class="flex items-center p-4 border-4 border-black rounded-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all group cursor-pointer">
        <div class="bg-brand-cyan p-2 rounded-xl border-2 border-black mr-4 shadow-[3px_3px_0_0_black]">
          <Video v-if="res.resource_type === 'video'" class="w-5 h-5 text-black" />
          <FileText v-else class="w-5 h-5 text-black" />
        </div>
        <div class="flex-1">
          <p class="text-[11px] font-black uppercase leading-tight mb-1">{{ res.title }}</p>
          <span class="text-[8px] px-2 py-0.5 bg-brand-purple text-black rounded font-bold uppercase">{{ res.target_age_group }}</span>
        </div>
      </div>
    </div>
  </div>
</template>