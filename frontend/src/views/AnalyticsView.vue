<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const alerts = ref([])

const fetchAlerts = async () => {
  const response = await api.getSystemAlerts()
  alerts.value = response.data
}

onMounted(fetchAlerts)
</script>

<template>
  <div class="space-y-8">
    <div v-for="alert in alerts" :key="alert.id" class="pop-3d p-6 bg-red-50 border-red-600 rounded-[32px]">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="bg-red-600 p-3 rounded-2xl border-2 border-black text-white">
            <AlertTriangle />
          </div>
          <div>
            <h4 class="font-black text-red-600 uppercase text-xs">User Alert: {{ alert.username }}</h4>
            <p class="text-[11px] font-bold text-black">{{ alert.description }}</p>
          </div>
        </div>
        <span class="text-[9px] font-black text-slate-400 italic">DETECTED: {{ new Date(alert.detected_at).toLocaleTimeString() }}</span>
      </div>
    </div>
    
    <div v-if="alerts.length === 0" class="pop-3d p-12 bg-white rounded-[40px] text-center">
      <p class="text-slate-400 font-black uppercase italic tracking-widest">No active risks detected by AI</p>
    </div>
  </div>
</template>