<script setup>
import { CheckCircle2, Lock, Star } from 'lucide-vue-next'

const modules = [
  { id: 1, title: 'GAD Basics', status: 'completed', color: 'from-[#00D4FF] to-[#00A3FF]', top: '15%', left: '25%' },
  { id: 2, title: 'Understanding Consent', status: 'current', color: 'from-[#FF7EB3] to-[#FF4E91]', top: '45%', left: '55%' },
  { id: 3, title: 'VAWC Prevention', status: 'locked', color: 'from-slate-400 to-slate-500', top: '75%', left: '35%' },
]
</script>

<template>
  <div class="relative w-full h-[600px] bg-white/30 backdrop-blur-md rounded-[50px] border border-white/50 shadow-2xl overflow-hidden p-10">
    
    <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-30">
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF7EB3" />
          <stop offset="100%" stop-color="#00D4FF" />
        </linearGradient>
      </defs>
      <path 
        d="M150,120 Q450,170 550,320 T350,520" 
        fill="none" 
        stroke="url(#pathGradient)" 
        stroke-width="40" 
        stroke-linecap="round" 
        class="drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
      />
    </svg>

    <div v-for="mod in modules" :key="mod.id" 
         :style="{ top: mod.top, left: mod.left }"
         class="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer perspective-1000">
      
      <div :class="[
        mod.color, 
        'bg-gradient-to-br p-1 rounded-[30px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-500',
        'group-hover:-rotate-6 group-hover:scale-110 group-hover:-translate-y-4',
        mod.status === 'locked' ? 'grayscale opacity-80' : 'animate-jump'
      ]">
        
        <div class="w-24 h-24 flex items-center justify-center relative bg-white/20 backdrop-blur-sm rounded-[25px] border border-white/40 shadow-inner">
          <img :src="`https://api.dicebear.com/7.x/bottts/svg?seed=${mod.id}`" 
               class="w-16 h-16 drop-shadow-lg" />
          
          <div v-if="mod.status === 'completed'" 
               class="absolute -top-3 -right-3 bg-green-400 rounded-full p-1.5 shadow-lg border-4 border-white">
            <CheckCircle2 class="w-5 h-5 text-white" />
          </div>
          
          <div v-if="mod.status === 'locked'" class="absolute inset-0 flex items-center justify-center bg-black/10 rounded-[25px]">
            <Lock class="text-white w-10 h-10 drop-shadow-md" />
          </div>

          <div v-if="mod.status === 'current'" class="absolute inset-0 rounded-[25px] pulse-blue pointer-events-none"></div>
        </div>
      </div>

      <div class="mt-6 bg-white/80 backdrop-blur-md text-brand-purple px-6 py-2 rounded-2xl text-[12px] font-bold uppercase tracking-wider shadow-xl border border-white transition-all group-hover:bg-brand-purple group-hover:text-white">
        {{ mod.title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

/* Leveraging the animations from your CSS */
.animate-jump {
  animation: jump 3s infinite ease-in-out;
}
</style>