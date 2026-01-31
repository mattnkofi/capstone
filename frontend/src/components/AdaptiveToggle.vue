<script setup>
import { ref } from 'vue'
import { Zap, ZapOff, Eye, EyeOff } from 'lucide-vue-next'
import axios from 'axios'

const isFocusMode = ref(false)

const toggleFocus = async () => {
  isFocusMode.value = !isFocusMode.value
  // Emitting event to Parent or updating Global Store (Pinia)
  document.dispatchEvent(new CustomEvent('toggle-adaptive', { detail: isFocusMode.value }))
  
  // Sync with database
  try {
    await axios.post('http://localhost:3000/api/adaptive/toggle', {
      userId: 1,
      enabled: isFocusMode.value
    })
  } catch (e) { console.error(e) }
}
</script>

<template>
  <button @click="toggleFocus" 
          :class="[isFocusMode ? 'bg-brand-cyan text-brand-purple' : 'bg-slate-100 text-slate-400', 'flex items-center space-x-3 px-4 py-2 rounded-2xl transition-all duration-500 font-bold text-xs shadow-sm border border-black/5']">
    <component :is="isFocusMode ? Zap : ZapOff" class="w-4 h-4" />
    <span>{{ isFocusMode ? 'FOCUS MODE: ON' : 'STANDARD VIEW' }}</span>
    <component :is="isFocusMode ? EyeOff : Eye" class="w-4 h-4 opacity-50" />
  </button>
</template>