<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, FileText, CheckCircle, ArrowRight, Upload, X, ChevronDown } from 'lucide-vue-next'
import api from '../services/api'

const router = useRouter()
const lessons = ref([])
const search = ref('')
const loading = ref(true)
const showUploadModal = ref(false)

// Dropdown Categories
const categoryOptions = ['GAD', 'Sex Education', 'VAWC Prevention', 'Legal Ethics', 'General']

const uploadForm = ref({
  title: '',
  category: 'General',
  resource_type: 'document',
  has_quiz: false,
  file: null
})

const fetchLessons = async () => {
  try {
    loading.value = true
    const res = await api.getResources()
    lessons.value = res.data
  } catch (err) {
    console.error("Error loading library:", err)
  } finally {
    loading.value = false
  }
}

const handleFileUpload = (e) => {
  uploadForm.value.file = e.target.files[0]
}

const submitUpload = async () => {
  if (!uploadForm.value.file || !uploadForm.value.title) {
    alert("Title and File are required.")
    return
  }

  const formData = new FormData()
  formData.append('title', uploadForm.value.title)
  formData.append('category', uploadForm.value.category)
  formData.append('resource_type', uploadForm.value.resource_type)
  formData.append('has_quiz', uploadForm.value.has_quiz)
  formData.append('file', uploadForm.value.file)

  try {
    await api.uploadResourceWithOptions(formData)
    showUploadModal.value = false
    uploadForm.value = { title: '', category: 'General', resource_type: 'document', has_quiz: false, file: null }
    fetchLessons()
  } catch (err) {
    console.error("Upload failed:", err)
    alert("Upload failed. Verify database columns: content_url, has_quiz, quiz_id.")
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
  <div class="max-w-6xl mx-auto space-y-10 p-6 animate-in fade-in duration-500">
    <header class="flex flex-col md:flex-row justify-between md:items-end gap-6">
      <div>
        <h2 class="text-3xl font-black text-white italic uppercase tracking-tighter">
          Resource <span class="text-pink-500">Library</span>
        </h2>
        <p class="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">ProtectEd Academic Assets</p>
      </div>

      <div class="flex items-center gap-4">
        <button @click="showUploadModal = true" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
          <Upload size="14" /> New Module
        </button>
        <div class="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 focus-within:border-blue-500/30 transition-all shadow-lg">
          <Search size="16" class="text-slate-500" />
          <input v-model="search" type="text" placeholder="SEARCH ASSETS..." 
            class="bg-transparent outline-none text-[10px] font-bold text-white uppercase tracking-widest w-40" />
        </div>
      </div>
    </header>

    <div v-if="showUploadModal" class="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
      <div class="bg-[#0f172a] border border-white/10 p-8 max-w-md w-full rounded-2xl shadow-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-white font-black uppercase italic tracking-tighter text-xl">Module Creator</h3>
          <button @click="showUploadModal = false" class="text-slate-500 hover:text-white transition-colors"><X /></button>
        </div>
        
        <div class="space-y-5">
          <div>
            <label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Title</label>
            <input v-model="uploadForm.title" type="text" placeholder="e.g., Understanding VAWC" class="w-full bg-white/5 border border-white/10 p-3 text-white text-xs rounded-lg focus:border-blue-500 outline-none transition-all" />
          </div>
          
          <div>
            <label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Category</label>
            <div class="relative">
              <select v-model="uploadForm.category" class="w-full bg-white/5 border border-white/10 p-3 text-white text-xs rounded-lg focus:border-blue-500 outline-none appearance-none cursor-pointer">
                <option v-for="cat in categoryOptions" :key="cat" :value="cat" class="bg-[#0f172a]">{{ cat }}</option>
              </select>
              <ChevronDown size="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Asset File (PDF/DOC)</label>
            <input type="file" @change="handleFileUpload" class="w-full text-slate-400 text-[10px] bg-white/5 p-3 rounded-lg border border-dashed border-white/10 hover:border-blue-500/50 transition-all cursor-pointer" />
          </div>
          
          <label class="flex items-center gap-3 py-2 cursor-pointer group">
            <input type="checkbox" v-model="uploadForm.has_quiz" class="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-blue-600 transition-all" />
            <span class="text-white text-[10px] font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors">Require Quiz Completion</span>
          </label>

          <button @click="submitUpload" class="w-full py-4 bg-pink-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-pink-700 transition-all shadow-lg shadow-pink-600/20 active:scale-95">
            Initialize Asset
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 3" :key="n" class="h-64 bg-white/5 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="lesson in filteredLessons" :key="lesson.id" class="bg-[#0f172a] border border-white/5 rounded-2xl group overflow-hidden flex flex-col hover:border-blue-500/50 transition-all shadow-lg">
        <div class="h-32 bg-[#020617] flex items-center justify-center relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-pink-600/5"></div>
          <FileText size="24" class="text-pink-500/30 group-hover:text-pink-500 transition-colors" />
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{{ lesson.category || 'General' }}</span>
            <h4 class="text-sm font-bold text-white uppercase tracking-tight line-clamp-2">{{ lesson.title }}</h4>
          </div>
          <button @click="openLesson(lesson.id)" class="mt-6 w-full py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
            Enter Module <ArrowRight size="12" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>