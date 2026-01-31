<script setup>
import { ref, onMounted, computed } from 'vue'
import { CheckCircle2, Lock, Cloud, Trees, Star } from 'lucide-vue-next'
import api from '../services/api'

const modules = ref([])
const userId = ref(1)

// Colors for all ages
const palette = ['bg-[#FF6B6B]', 'bg-[#4D96FF]', 'bg-[#6BCB77]', 'bg-[#FFD93D]', 'bg-[#FF9F45]', 'bg-[#9333ea]']

/**
 * DYNAMIC ROAD LOGIC
 * Generates an SVG path string based on the number of modules
 */
const dynamicPath = computed(() => {
  if (modules.value.length === 0) return ''
  
  // Starting point of the road
  let path = "M 400 100 " 
  
  modules.value.forEach((_, index) => {
    if (index === 0) return
    
    const yStart = 100 + (index - 1) * 200
    const yEnd = 100 + index * 200
    
    // Every even curve goes right, every odd curve goes left
    if (index % 2 !== 0) {
      // Curve to the Right
      path += `C 850 ${yStart}, 850 ${yEnd}, 400 ${yEnd} `
    } else {
      // Curve to the Left
      path += `C -50 ${yStart}, -50 ${yEnd}, 400 ${yEnd} `
    }
  })
  return path
})

const loadPath = async () => {
  try {
    const response = await api.getLearningPath(userId.value)
    modules.value = response.data.map((mod, index) => {
      const isRight = (index % 4 === 1 || index % 4 === 2)
      return {
        ...mod,
        color: palette[index % palette.length],
        // Positions nodes exactly on the road curves
        top: `${100 + (index * 200)}px`, 
        left: isRight ? '75%' : '25%'
      }
    })
  } catch (error) {
    console.error("Error loading path:", error)
  }
}

onMounted(loadPath)
</script>

<template>
  <div class="flex justify-center bg-slate-100 p-8 min-h-screen">
    <div class="relative w-full max-w-[800px] bg-[#A0E7E5] border-[10px] border-black overflow-hidden rounded-[3rem] shadow-[0_20px_0_0_black]">
      
      <div class="absolute inset-0 pointer-events-none opacity-40">
        <Cloud class="absolute top-20 left-10 w-20 h-20 text-white" />
        <Trees class="absolute top-[500px] right-10 w-16 h-16 text-[#3E7C17]" />
      </div>

      <div class="relative w-full max-h-[850px] overflow-y-auto custom-scrollbar pt-20 pb-40">
        <div class="relative mx-auto" :style="{ height: (modules.length * 200) + 200 + 'px' }">
          
          <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path :d="dynamicPath" fill="none" stroke="black" stroke-width="90" stroke-linecap="round" />
            <path :d="dynamicPath" fill="none" stroke="#B4E197" stroke-width="70" stroke-linecap="round" />
            <path :d="dynamicPath" fill="none" stroke="white" stroke-width="4" stroke-dasharray="20 25" stroke-linecap="round" class="opacity-40" />
          </svg>

          <div v-for="mod in modules" :key="mod.id" 
               :style="{ top: mod.top, left: mod.left }"
               class="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
            
            <div :class="[mod.color, 'w-28 h-28 rounded-[40px] border-[6px] border-black shadow-[0_12px_0_0_black] transition-all duration-200 group-hover:-translate-y-1 active:translate-y-2 active:shadow-none']">
              <div class="w-full h-full flex items-center justify-center relative">
                <img :src="`https://api.dicebear.com/7.x/bottts/svg?seed=${mod.id}`" 
                     :class="['w-16 h-16 relative z-10', mod.status === 'locked' ? 'grayscale opacity-30' : '']" />
                
                <div v-if="mod.status === 'completed'" class="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 border-4 border-black shadow-[3px_3px_0_0_black]">
                  <Star class="w-5 h-5 text-black fill-black" />
                </div>
                <div v-if="mod.status === 'locked'" class="absolute inset-0 flex items-center justify-center bg-black/10 rounded-[34px]">
                  <Lock class="text-black/40 w-10 h-10" />
                </div>
              </div>
            </div>

            <div class="mt-6 bg-white border-4 border-black px-6 py-1.5 rounded-2xl text-[11px] font-black uppercase shadow-[5px_5px_0_0_black]">
               {{ mod.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 0px; }
.custom-scrollbar { scrollbar-width: none; }
</style>