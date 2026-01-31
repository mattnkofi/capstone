<script setup>
import { ref, onMounted } from 'vue'
import { CheckCircle2, Lock, Flame, Wind, Bird, Trees } from 'lucide-vue-next'
import api from '../services/api'

const modules = ref([])
const userId = ref(1)

const palette = ['bg-rose-500', 'bg-indigo-600', 'bg-emerald-500', 'bg-amber-500', 'bg-fuchsia-600']

const loadPath = async () => {
  try {
    const response = await api.getLearningPath(userId.value)
    modules.value = response.data.map((mod, index) => {
      const isRight = (index % 4 === 1 || index % 4 === 2)
      return {
        ...mod,
        color: palette[index % palette.length],
        top: `${15 + (index * 22)}%`, 
        left: isRight ? '70%' : '30%',
        scale: 0.9 + (Math.random() * 0.2),
        rotate: (Math.random() - 0.5) * 10
      }
    })
  } catch (error) {
    console.error("Error loading learning path:", error)
  }
}

onMounted(loadPath)
</script>

<template>
  <div class="relative w-full h-[850px] bg-[#1a1c2c] overflow-hidden border-[10px] border-slate-900 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
    
    <div class="absolute inset-0 bg-grid-dark opacity-20"></div>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 6" :key="i" 
           class="absolute bg-white/10 rounded-full blur-xl animate-drift"
           :style="{ 
             width: Math.random() * 80 + 'px', 
             height: Math.random() * 80 + 'px', 
             top: Math.random() * 100 + '%', 
             left: Math.random() * 100 + '%',
             animationDuration: (15 + Math.random() * 10) + 's' 
           }">
      </div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
       <Bird class="absolute top-20 left-10 text-white/20 animate-fly-across w-6 h-6" />
       <Bird class="absolute top-1/2 right-10 text-white/20 animate-fly-across w-5 h-5" style="animation-delay: -5s" />
       <Wind class="absolute top-[30%] left-[45%] text-indigo-400/30 w-16 h-16 rotate-12" />
       <Trees class="absolute bottom-10 left-[10%] text-emerald-900/40 w-12 h-12" />
    </div>

    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <path 
        d="M 300 100 C 800 100, 800 350, 500 350 S 200 600, 500 600 S 800 850, 500 850" 
        fill="none" 
        stroke="#000" 
        stroke-width="70" 
        stroke-linecap="round" 
      />
      <path 
        d="M 300 100 C 800 100, 800 350, 500 350 S 200 600, 500 600 S 800 850, 500 850" 
        fill="none" 
        stroke="#2d314d" 
        stroke-width="55" 
        stroke-linecap="round" 
      />
      <path 
        class="path-flow"
        d="M 300 100 C 800 100, 800 350, 500 350 S 200 600, 500 600 S 800 850, 500 850" 
        fill="none" 
        stroke="rgba(255,255,255,0.1)" 
        stroke-width="20" 
        stroke-dasharray="2 30" 
        stroke-linecap="round" 
      />
    </svg>

    <div v-for="mod in modules" :key="mod.id" 
         :style="{ top: mod.top, left: mod.left, transform: `translate(-50%, -50%) scale(${mod.scale}) rotate(${mod.rotate}deg)` }"
         class="absolute flex flex-col items-center group cursor-pointer z-10 transition-transform hover:scale-110">
      
      <div :class="[
        mod.color, 
        'w-20 h-20 rounded-[1.5rem] border-[5px] border-slate-900 shadow-[0_10px_0_0_#000] relative overflow-visible',
        mod.status === 'current' ? 'ring-offset-2 ring-offset-[#1a1c2c] ring-2 ring-white animate-pulse-fast' : ''
      ]">
        
        <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-[1.2rem] transition-opacity"></div>
        
        <div class="w-full h-full flex items-center justify-center">
          <img :src="`https://api.dicebear.com/7.x/bottts/svg?seed=${mod.id}`" 
               :class="['w-10 h-10 relative z-10 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]', 
                        mod.status === 'locked' ? 'grayscale brightness-[0.3]' : '']" />
          
          <div v-if="mod.status === 'locked'" class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[1.2rem] z-20">
            <Lock class="text-white/50 w-7 h-7" />
          </div>

          <div v-if="mod.status === 'current'" class="absolute -top-4 -left-1 z-0">
             <Flame class="text-orange-500 fill-orange-500 w-7 h-7 animate-bounce" />
          </div>
        </div>
      </div>

      <div class="mt-4 bg-slate-900 text-white border-2 border-slate-700 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] shadow-[5px_5px_0_0_rgba(0,0,0,0.4)] relative">
        <div v-if="mod.status === 'completed'" class="absolute -right-2 -top-2 bg-emerald-500 p-0.5 rounded-full border-2 border-slate-900">
           <CheckCircle2 class="w-3 h-3 text-white" />
        </div>
        {{ mod.title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-dark {
  background-image: linear-gradient(to right, #ffffff05 1px, transparent 1px),
                    linear-gradient(to bottom, #ffffff05 1px, transparent 1px);
  background-size: 40px 40px;
}

@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, 15px); }
}

@keyframes fly-across {
  0% { transform: translateX(-100px) translateY(0); opacity: 0; }
  10% { opacity: 0.2; }
  90% { opacity: 0.2; }
  100% { transform: translateX(1100px) translateY(-40px); opacity: 0; }
}
.animate-fly-across { animation: fly-across 12s linear infinite; }

@keyframes pulse-fast {
  0%, 100% { box-shadow: 0 10px 0 0 #000, 0 0 0px rgba(255,255,255,0); }
  50% { box-shadow: 0 10px 0 0 #000, 0 0 20px rgba(255,255,255,0.4); }
}
.animate-pulse-fast { animation: pulse-fast 1.5s infinite; }

.path-flow {
  stroke-dashoffset: 1000;
  animation: flow 40s linear infinite;
}
@keyframes flow { to { stroke-dashoffset: 0; } }

.custom-scrollbar::-webkit-scrollbar { width: 0px; }
</style>