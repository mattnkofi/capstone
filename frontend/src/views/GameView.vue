<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-8 flex flex-col">
    <div class="flex justify-between items-center mb-8 shrink-0">
      <button @click="$router.push('/dashboard')" 
        class="bg-white border-4 border-black p-3 rounded-2xl font-black uppercase shadow-[4px_4px_0_0_black] hover:translate-y-1 hover:shadow-none transition-all">
        ← Exit Game
      </button>
      <div class="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl">
        <span class="animate-pulse w-3 h-3 bg-red-500 rounded-full"></span>
        <span class="font-black uppercase text-sm tracking-widest">AI Analysis Mode</span>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <div v-if="loading" class="font-black text-2xl uppercase italic animate-bounce">
        Loading Scenario...
      </div>
      <GamifiedQuizPlayer v-else :quizData="quizData" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GamifiedQuizPlayer from '../components/GamifiedQuizPlayer.vue'
import api from '../services/api'

const route = useRoute()
const loading = ref(true)
const quizData = ref(null)

onMounted(async () => {
  try {
    // Replace with your actual endpoint
    const res = await api.get(`/quiz/fetch/${route.params.id}`)
    quizData.value = res.data
  } catch (err) {
    console.error("Failed to load game", err)
  } finally {
    loading.value = false
  }
})
</script>