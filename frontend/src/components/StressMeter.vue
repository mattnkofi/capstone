<script setup>
import { Wind, HeartPulse, Sparkles } from 'lucide-vue-next'
import { ref } from 'vue'
import axios from 'axios' // Ensure axios is installed via npm install axios

const stress = ref(40)
const userId = ref(1) // Hardcoded for demo; in production, get this from your Auth state

// Function to sync with the backend
const saveStressEntry = async () => {
  const tip = stress.value > 60 
    ? 'AI detected high stress. Try the "5-4-3-2-1" grounding module.' 
    : 'Balanced! You have earned +50 extra points for today.'

  try {
    await axios.post('http://localhost:3000/api/wellness/stress', {
      userId: userId.value,
      value: stress.value,
      tip: tip
    })
    console.log('Stress level synced to database successfully.')
  } catch (error) {
    console.error('Failed to sync with database:', error)
  }
}
</script>

<template>
  <div class="bg-brand-purple p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group border-b-8 border-black/20">
    <div class="relative z-10 space-y-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
          <HeartPulse class="w-4 h-4 text-brand-pink" />
          <span class="text-[10px] font-black uppercase tracking-widest">Wellness Meter</span>
        </div>
        <Sparkles class="w-5 h-5 text-brand-cyan animate-pulse" />
      </div>

      <div class="text-center">
        <h3 class="text-3xl font-black italic mb-1 uppercase tracking-tighter">Stress Check</h3>
        <p class="text-brand-cyan/80 text-[10px] font-bold">REGULAR FEEDBACK FOR EARLY DETECTION</p>
      </div>

      <input 
        type="range" 
        v-model="stress" 
        @change="saveStressEntry"
        class="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-cyan shadow-inner"
      >
      
      <div class="bg-white/10 p-5 rounded-3xl border border-white/10 backdrop-blur-xl">
        <div class="flex items-start space-x-4">
          <div class="bg-brand-cyan/20 p-2 rounded-xl"><Wind class="w-5 h-5 text-brand-cyan" /></div>
          <div>
            <p class="text-[10px] font-black text-brand-cyan uppercase mb-1">Regulation Tip:</p>
            <p class="text-xs leading-relaxed font-medium">
              {{ stress > 60 ? 'AI detected high stress. Try the "5-4-3-2-1" grounding module.' : 'Balanced! You have earned +50 extra points for today.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>