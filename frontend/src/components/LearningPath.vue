<script setup>
import { CheckCircle2, Lock, Star } from 'lucide-vue-next'

const modules = [
  { id: 1, title: 'GAD Basics', status: 'completed', color: 'bg-brand-cyan', top: '10%', left: '20%' },
  { id: 2, title: 'Understanding Consent', status: 'current', color: 'bg-brand-pink', top: '40%', left: '50%' },
  { id: 3, title: 'VAWC Prevention', status: 'locked', color: 'bg-slate-300', top: '70%', left: '30%' },
]
</script>

<template>
  <div class="relative w-full h-[600px] bg-white/50 rounded-[40px] border-4 border-white shadow-xl overflow-hidden p-10">
    <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20">
      <path d="M150,100 Q400,150 500,300 T300,500" fill="none" stroke="#4C4082" stroke-width="60" stroke-linecap="round" />
    </svg>

    <div v-for="mod in modules" :key="mod.id" 
         :style="{ top: mod.top, left: mod.left }"
         class="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
      
      <div :class="[mod.color, 'p-1 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 border-8 border-white']">
        <div class="w-20 h-20 flex items-center justify-center relative">
          <img :src="`https://api.dicebear.com/7.x/bottts/svg?seed=${mod.id}`" class="w-14 h-14" />
          <div v-if="mod.status === 'completed'" class="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white">
            <CheckCircle2 class="w-4 h-4 text-white" />
          </div>
          <Lock v-if="mod.status === 'locked'" class="text-white/50 w-8 h-8" />
        </div>
      </div>

      <div class="mt-4 bg-brand-purple text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg">
        {{ mod.title }}
      </div>
    </div>
  </div>
</template>