<script setup>
import { ref, onMounted } from 'vue'
import { BookOpen, Video, FileText, ArrowUpRight } from 'lucide-vue-next'
import api from '../services/api'

const resources = ref([])

onMounted(async () => {
  const res = await api.getResources()
  resources.value = res.data
})
</script>

<template>
  <div class="pop-3d p-6 bg-white rounded-[40px]">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-black text-brand-purple uppercase tracking-widest text-xs">Knowledge Base</h3>
      <BookOpen class="w-4 h-4 text-brand-cyan" />
    </div>

    <div class="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
      <a v-for="res in resources" :key="res.id" :href="res.content_url" target="_blank"
         class="flex items-center p-4 border-4 border-black rounded-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all group">
        <div class="bg-brand-cyan p-2 rounded-xl border-2 border-black mr-4 shadow-[3px_3px_0_0_black]">
          <Video v-if="res.resource_type === 'video'" class="w-5 h-5 text-black" />
          <FileText v-else class="w-5 h-5 text-black" />
        </div>
        <div class="flex-1">
          <p class="text-[11px] font-black uppercase leading-tight mb-1">{{ res.title }}</p>
          <span class="text-[8px] px-2 py-0.5 bg-brand-purple text-black rounded font-bold uppercase">{{ res.target_age_group }}</span>
        </div>
        <ArrowUpRight class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
</style>