<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Folder, Plus, Inbox, Eye, Download, X, 
  Maximize, Search, FileText, BrainCircuit 
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
const uploadType = ref('readable') // Initialized to avoid render warnings

// Modal State
const showViewer = ref(false)
const selectedResource = ref(null)
const iframeRef = ref(null)

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

// Search and Category Filter Logic
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

// Main Upload Logic
const processUpload = async () => {
  if (!selectedFile.value || !uploadTitle.value) {
    alert("Please provide a title and select a file.")
    return
  }
  
  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('title', uploadTitle.value)
  formData.append('category', selectedCategory.value)
  formData.append('uploadType', uploadType.value)
  formData.append('resource_type', 'document')
  formData.append('target_age_group', 'All Ages')

  try {
    // FIX: Using the correct service method defined in api.js
    const res = await api.uploadResourceWithOptions(formData)
    
    const resourceId = res.data.resourceId
    const shouldRedirect = res.data.redirectToQuiz

    if (shouldRedirect) {
      // Navigate to the Quiz Creator with the new ID
      router.push(`/admin/create-quiz/${resourceId}`)
    } else {
      // Reset form and refresh
      uploadTitle.value = ''
      selectedFile.value = null
      uploadType.value = 'readable'
      fetchResources()
      alert("Resource uploaded successfully!")
    }
  } catch (err) {
    console.error("Upload failed", err)
    alert("Failed to upload resource. Check if backend is running.")
  }
}

const openViewer = (res) => {
  selectedResource.value = res
  showViewer.value = true
}

const enterFullscreen = () => {
  if (iframeRef.value?.requestFullscreen) {
    iframeRef.value.requestFullscreen()
  }
}

const getDownloadUrl = (url) => {
  const filename = url.split('/').pop()
  return `http://localhost:3000/api/resources/download/${filename}`
}

onMounted(fetchResources)
</script>

<template>
  <div class="pop-3d p-6 bg-white rounded-[40px] flex flex-col h-full relative border-4 border-black">
    
    <div class="mb-6 space-y-4 shrink-0">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search resources..." 
          class="w-full pl-10 pr-4 py-3 border-2 border-black rounded-xl text-xs font-bold focus:ring-2 ring-brand-cyan outline-none"
        />
      </div>

      <div class="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        <button v-for="tab in ['All', ...categories]" :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-2 rounded-xl border-2 border-black text-[10px] font-black uppercase transition-all whitespace-nowrap',
            activeTab === tab ? 'bg-brand-cyan shadow-[4px_4px_0px_0px_black] -translate-y-1' : 'bg-slate-100 hover:bg-slate-200'
          ]">
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="mb-8 p-6 border-4 border-black border-dashed rounded-3xl bg-slate-50 shrink-0">
      <h3 class="text-[10px] font-black uppercase mb-4 text-slate-400">Add New Content</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input v-model="uploadTitle" type="text" placeholder="Document Title..." class="p-3 border-2 border-black rounded-xl text-xs font-bold bg-white" />
        <select v-model="selectedCategory" class="p-3 border-2 border-black rounded-xl text-xs font-bold bg-white outline-none">
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="mb-4 flex flex-col gap-3">
        <p class="font-black text-[9px] uppercase text-slate-400">1. Choose File</p>
        <div class="p-2 border-2 border-black rounded-xl bg-white">
          <input type="file" @change="handleFileSelect" class="text-[10px] w-full" />
        </div>
      </div>
      
      <div v-if="selectedFile" class="flex flex-col gap-4 animate-in fade-in duration-300">
        <p class="font-black text-[9px] uppercase text-slate-400">2. Upload Type</p>
        <div class="flex gap-2">
          <button @click="uploadType = 'readable'" 
            :class="uploadType === 'readable' ? 'bg-brand-cyan shadow-[3px_3px_0px_0px_black] -translate-y-1' : 'bg-white'" 
            class="flex-1 p-3 border-2 border-black rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2">
            <FileText class="w-4 h-4" /> Readable
          </button>
          <button @click="uploadType = 'quiz'" 
            :class="uploadType === 'quiz' ? 'bg-brand-purple text-white shadow-[3px_3px_0px_0px_black] -translate-y-1' : 'bg-white'"
            class="flex-1 p-3 border-2 border-black rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2">
            <BrainCircuit class="w-4 h-4" /> Quiz Game
          </button>
        </div>
        
        <button @click="processUpload" 
          class="w-full bg-black text-white p-4 rounded-2xl font-black uppercase text-xs hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_#FF007F] active:shadow-none active:translate-y-1">
          {{ uploadType === 'quiz' ? 'Continue to Quiz Creator' : 'Finalize Upload' }}
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div v-if="filteredResources.length > 0">
        <div v-for="res in filteredResources" :key="res.id" 
          class="flex items-center p-4 border-4 border-black rounded-2xl mb-4 bg-white hover:bg-slate-50 transition-all">
          <div class="bg-brand-purple p-2 rounded-xl border-2 border-black mr-4 shadow-[3px_3px_0_0_black]">
            <Folder class="w-5 h-5 text-black" />
          </div>
          <div class="flex-1">
            <p class="text-[11px] font-black uppercase leading-tight">{{ res.title }}</p>
            <span class="text-[8px] px-2 py-0.5 bg-brand-cyan border border-black rounded font-black uppercase inline-block mt-1">
              {{ res.category }}
            </span>
          </div>
          
          <div class="flex gap-2">
            <button @click="openViewer(res)" class="p-2 border-2 border-black rounded-lg hover:bg-brand-cyan transition-colors">
              <Eye class="w-4 h-4" />
            </button>
            <a :href="getDownloadUrl(res.content_url)" download class="p-2 border-2 border-black rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center">
              <Download class="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center p-12 text-center border-4 border-black rounded-3xl border-dotted bg-slate-50">
        <Inbox class="w-12 h-12 text-slate-300 mb-4" />
        <p class="font-black text-slate-400 uppercase text-xs">No matching resources found</p>
      </div>
    </div>

    <div v-if="showViewer" class="fixed inset-0 z-[100] bg-black/90 flex flex-col p-4 md:p-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-white font-black uppercase tracking-widest">{{ selectedResource?.title }}</h2>
        <div class="flex gap-4">
          <button @click="enterFullscreen" class="text-white hover:text-brand-cyan flex items-center gap-2">
            <Maximize class="w-6 h-6" /> <span class="text-[10px] font-bold uppercase">Fullscreen</span>
          </button>
          <button @click="showViewer = false" class="text-white hover:text-red-500">
            <X class="w-8 h-8" />
          </button>
        </div>
      </div>
      
      <div class="flex-1 bg-white rounded-3xl overflow-hidden border-4 border-black relative">
        <iframe 
          ref="iframeRef"
          :src="selectedResource?.content_url" 
          class="w-full h-full" 
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
.animate-in {
  animation: fadeInSlide 0.4s ease-out;
}
@keyframes fadeInSlide {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>