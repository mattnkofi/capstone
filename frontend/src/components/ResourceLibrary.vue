<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Folder, Plus, Search, FileText, BrainCircuit, 
  Eye, Download, Inbox, Sparkles 
} from 'lucide-vue-next'
import api from '../services/api'

const router = useRouter()

// Reactive State
const resources = ref([])
const uploadTitle = ref('')
const selectedFile = ref(null)
const selectedCategory = ref('General')
const activeTab = ref('All')
const searchQuery = ref('')
const uploadType = ref('readable')

const categories = ['General', 'VAWC', 'Sex Education', 'Gender and Development', 'Safety Plan']

// Fetch existing resources from backend
const fetchResources = async () => {
  try {
    const res = await api.getResources()
    resources.value = res.data || []
  } catch (err) {
    console.error("Failed to fetch resources", err)
    resources.value = []
  }
}

// Filter Logic
const filteredResources = computed(() => {
  return resources.value.filter(res => {
    const matchesCategory = activeTab.value === 'All' || res.category === activeTab.value;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  })
})

const handleFileSelect = (e) => {
  selectedFile.value = e.target.files[0]
}

// Navigation to dedicated Full-Screen Dashboard Viewer
const openViewer = (res) => {
  router.push({ name: 'DocumentViewer', params: { resourceId: res.id } })
}

// Upload Logic utilizing the corporate blue-pink gradient system
const processUpload = async () => {
  if (!selectedFile.value || !uploadTitle.value) return

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('title', uploadTitle.value)
  formData.append('category', selectedCategory.value)
  formData.append('uploadType', uploadType.value)

  try {
    const res = await api.uploadResourceWithOptions(formData)
    
    if (res.data.redirectToQuiz) {
      router.push(`/admin/create-quiz/${res.data.resourceId}`)
    } else {
      uploadTitle.value = ''
      selectedFile.value = null
      fetchResources()
    }
  } catch (err) {
    console.error("Upload failed", err)
  }
}

const getDownloadUrl = (url) => {
  const filename = url.split('/').pop()
  return `http://localhost:3000/api/resources/download/${filename}`
}

onMounted(fetchResources)
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8 pb-12">
    <div class="flex flex-col md:flex-row gap-6 items-center">
      <div class="relative flex-1 w-full">
        <Search class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search corporate intelligence..." 
          class="w-full pl-14 pr-6 py-5 bg-white/50 backdrop-blur-md border border-slate-200 rounded-[32px] text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm"
        />
      </div>
      
      <div class="flex space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto">
        <button v-for="tab in ['All', ...categories]" :key="tab"
          @click="activeTab = tab"
          :class="[
            activeTab === tab 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          ]"
          class="px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="glass-card p-8 bg-gradient-to-br from-white/90 to-blue-50/30">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Plus class="w-5 h-5" />
          </div>
          <h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Resource Distribution</h3>
        </div>
        <div class="flex items-center space-x-2 text-pink-500">
          <Sparkles class="w-4 h-4" />
          <span class="text-[9px] font-black uppercase tracking-tighter italic">AI Ready</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Document Title</label>
          <input v-model="uploadTitle" type="text" placeholder="Enter formal title..." 
                 class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:border-blue-500 transition-all outline-none" />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Classification Category</label>
          <select v-model="selectedCategory" 
                  class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none cursor-pointer appearance-none">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6 items-end">
        <div class="flex-1 w-full space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 italic">Attach Asset</label>
          <div class="p-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-between group hover:border-blue-400 transition-all cursor-pointer">
            <input type="file" @change="handleFileSelect" class="text-xs w-full cursor-pointer" />
          </div>
        </div>
        
        <div v-if="selectedFile" class="flex gap-3 w-full md:w-auto">
          <button @click="uploadType = 'readable'" 
                  :class="uploadType === 'readable' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-500'" 
                  class="px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <FileText class="w-4 h-4" /> Readable
          </button>
          <button @click="uploadType = 'quiz'" 
                  :class="uploadType === 'quiz' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20' : 'bg-slate-100 text-slate-500'" 
                  class="px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <BrainCircuit class="w-4 h-4" /> Gamify
          </button>
        </div>

        <button @click="processUpload" v-if="selectedFile" 
                class="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
          Deploy Resource
        </button>
      </div>
    </div>

    <div v-if="filteredResources.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="res in filteredResources" :key="res.id" 
           class="glass-card p-6 flex flex-col justify-between group border-transparent hover:border-blue-200 cursor-pointer"
           @click="openViewer(res)">
        <div class="flex items-start justify-between mb-8">
          <div class="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <Folder class="w-6 h-6" />
          </div>
          <div class="flex gap-2">
            <a :href="getDownloadUrl(res.content_url)" download @click.stop 
               class="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
              <Download class="w-4 h-4" />
            </a>
            <button class="p-2.5 bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-xl transition-all">
              <Eye class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div>
          <h4 class="text-sm font-black uppercase leading-tight text-slate-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
            {{ res.title }}
          </h4>
          <div class="flex items-center justify-between">
            <span class="text-[9px] px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-black uppercase tracking-widest border border-blue-100">
              {{ res.category }}
            </span>
            <span class="text-[8px] font-bold text-slate-300 uppercase italic">Ref: #{{ res.id }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="glass-card p-20 flex flex-col items-center justify-center text-center border-dashed">
      <Inbox class="w-16 h-16 text-slate-200 mb-6" />
      <h3 class="text-lg font-black uppercase text-slate-400 italic">No assets found</h3>
      <p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">Try adjusting your filters or search query</p>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 15px -1px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2rem;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>