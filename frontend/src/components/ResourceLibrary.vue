<script setup>
import { ref, onMounted, computed } from 'vue'
import { Folder, FileText, Upload, Plus } from 'lucide-vue-next'
import api from '../services/api'

const resources = ref([])
const uploadTitle = ref('')
const selectedFile = ref(null)
const selectedCategory = ref('General')
const activeTab = ref('All')

const categories = ['General', 'VAWC', 'Sex Education', 'Gender and Development', 'Safety Plan']

const fetchResources = async () => {
  const res = await api.getResources()
  resources.value = res.data
}

const filteredResources = computed(() => {
  if (activeTab.value === 'All') return resources.value
  return resources.value.filter(r => r.category === activeTab.value)
})

const submitUpload = async () => {
  if (!selectedFile.value || !uploadTitle.value) return
  
  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('title', uploadTitle.value)
  formData.append('category', selectedCategory.value) // Sending the category
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

onMounted(fetchResources)
</script>

<template>
  <div class="pop-3d p-6 bg-white rounded-[40px]">
    <div class="flex space-x-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
      <button v-for="tab in ['All', ...categories]" :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 rounded-xl border-2 border-black text-[10px] font-black uppercase transition-all whitespace-nowrap',
          activeTab === tab ? 'bg-brand-cyan shadow-[4px_4px_0px_0px_black] -translate-y-1' : 'bg-slate-100 hover:bg-slate-200'
        ]">
        {{ tab }}
      </button>
    </div>

    <div class="mb-8 p-6 border-4 border-black border-dashed rounded-3xl bg-slate-50">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input v-model="uploadTitle" type="text" placeholder="Document Title..." 
          class="p-3 border-2 border-black rounded-xl text-xs font-bold" />
        
        <select v-model="selectedCategory" class="p-3 border-2 border-black rounded-xl text-xs font-bold bg-white">
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="flex items-center gap-4">
        <input type="file" @change="(e) => selectedFile = e.target.files[0]" class="text-[10px] flex-1" />
        <button @click="submitUpload" class="bg-brand-cyan p-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all">
          <Plus class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      <div v-for="res in filteredResources" :key="res.id"
         class="flex items-center p-4 border-4 border-black rounded-2xl hover:bg-slate-50 transition-all cursor-pointer">
        <div class="bg-brand-purple p-2 rounded-xl border-2 border-black mr-4 shadow-[3px_3px_0_0_black]">
          <Folder class="w-5 h-5 text-black" />
        </div>
        <div class="flex-1">
          <p class="text-[11px] font-black uppercase leading-tight">{{ res.title }}</p>
          <div class="flex gap-2 mt-1">
             <span class="text-[8px] px-2 py-0.5 bg-brand-cyan text-black rounded font-black uppercase border border-black">
               {{ res.category }}
             </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>