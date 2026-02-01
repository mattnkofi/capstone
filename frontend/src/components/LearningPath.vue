<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, Lock, Flame, Maximize2, Minimize2, Trees, Flower2, Cloud, Sparkles, Play } from 'lucide-vue-next'
import api from '../services/api'

const router = useRouter()
const modules = ref([])
const userId = ref(1)
const isFullscreen = ref(false)
const containerRef = ref(null)

const palette = ['bg-[#FF007F]', 'bg-[#00D4FF]', 'bg-[#FF71CE]', 'bg-[#01CDFE]', 'bg-[#B967FF]']

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    containerRef.value.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const loadPath = async () => {
  try {
    const response = await api.getLearningPath(userId.value);
    const data = response.data || [];
    modules.value = data.map((mod, index) => {
      const isRight = (index % 4 === 1 || index % 4 === 2);
      return {
        ...mod,
        color: palette[index % palette.length],
        top: `${200 + (index * 250)}px`, 
        left: isRight ? '65%' : '35%',
        // Store if the module has a playable quiz
        isPlayable: mod.has_quiz === 1 
      };
    });
  } catch (error) {
    console.error("Error loading learning path:", error);
  }
};

const handleModuleClick = (mod) => {
  if (mod.status === 'locked') return;

  if (mod.isPlayable) {
    // Navigate using the resourceId because the GameView fetches data by resourceId
    router.push(`/game/${mod.resourceId}`);
  } else {
    // Fallback if there is no game (e.g., view document)
    console.log("No quiz available for this module.");
  }
};

const dynamicPath = computed(() => {
  if (modules.value.length === 0) return ''
  let d = "M 400 50 "
  modules.value.forEach((mod, i) => {
    if (i === 0) return
    const prevY = 200 + (i - 1) * 250
    const currY = 200 + i * 250
    d += (i % 2 !== 0) 
      ? `C 750 ${prevY}, 750 ${currY}, 400 ${currY} ` 
      : `C 50 ${prevY}, 50 ${currY}, 400 ${currY} `
  })
  return d
})

onMounted(() => {
  loadPath()
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})
</script>

<template>
  <div 
    ref="containerRef"
    class="relative w-full h-[850px] bg-gradient-to-b from-black via-[#001F3F] to-black overflow-y-auto overflow-x-hidden border-[12px] border-[#111] rounded-[5rem] shadow-2xl custom-scrollbar"
  >
    <button @click="toggleFullscreen" class="fixed top-8 right-8 z-50 p-4 bg-white rounded-full border-4 border-black text-black shadow-[0_6px_0_0_#FF007F] hover:translate-y-1 hover:shadow-none transition-all">
      <Maximize2 v-if="!isFullscreen" class="w-6 h-6" />
      <Minimize2 v-else class="w-6 h-6" />
    </button>

    <div class="relative" :style="{ height: (modules.length * 250) + 400 + 'px' }">
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <Cloud class="absolute text-[#00D4FF] top-10 left-[-100px] w-24 h-24 animate-float-slow opacity-20" />
        <Cloud class="absolute text-[#FF71CE] top-60 right-[-100px] w-20 h-20 animate-float-fast opacity-20" />
        <Sparkles class="absolute text-white top-[400px] left-[20%] w-8 h-8 animate-pulse opacity-40" />
        <div v-for="n in 8" :key="'tree-'+n" class="absolute" :style="{ top: (n * 300) + 'px', left: (n % 2 === 0 ? '5%' : '85%') }">
          <Trees class="text-[#00D4FF] w-12 h-12 opacity-20" />
        </div>
      </div>

      <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path :d="dynamicPath" fill="none" stroke="#FF007F" stroke-width="140" stroke-linecap="round" class="opacity-10 blur-md" />
        <path :d="dynamicPath" fill="none" stroke="#00D4FF" stroke-width="125" stroke-linecap="round" class="opacity-20" />
        <path :d="dynamicPath" fill="none" stroke="#111" stroke-width="110" stroke-linecap="round" />
        <path :d="dynamicPath" fill="none" stroke="#FF71CE" stroke-width="4" stroke-dasharray="10 20" stroke-linecap="round" class="opacity-50" />
      </svg>

      <div v-for="(mod, index) in modules" :key="mod.id" 
           :style="{ top: mod.top, left: mod.left }"
           class="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10">
        
        <div 
          @click="handleModuleClick(mod)"
          :class="[
            mod.color, 
            'w-28 h-28 rounded-full border-[6px] border-black shadow-[0_12px_0_0_#111] flex flex-col items-center justify-center relative transition-all group-hover:scale-110 group-hover:-translate-y-2 active:translate-y-2 active:shadow-none cursor-pointer',
            (mod.status === 'locked' || !mod.isPlayable) ? 'grayscale cursor-not-allowed' : ''
          ]"
        >
          <img :src="`https://api.dicebear.com/7.x/bottts/svg?seed=${mod.id}`" class="w-12 h-12 relative z-10" />
          
          <div v-if="mod.status !== 'locked' && mod.isPlayable" class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30">
             <Play class="text-white fill-white w-8 h-8" />
          </div>

          <div v-if="mod.status === 'locked'" class="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center z-20">
            <Lock class="text-white w-10 h-10 opacity-70" />
          </div>
          
          <div v-if="mod.status === 'current'" class="absolute -top-8">
             <Flame class="text-[#ff4d00] fill-[#fff200] w-12 h-12 animate-bounce" />
          </div>
        </div>

        <div class="mt-6 bg-black text-white border-2 border-[#FF71CE] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_6px_0_0_#111] flex items-center gap-2">
          <CheckCircle2 v-if="mod.status === 'completed'" class="w-4 h-4 text-[#00D4FF]" />
          {{ mod.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 12px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #FF71CE; border-radius: 50px; border: 3px solid black; }

@keyframes float {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(100vw + 200px)); }
}
.animate-float-slow { animation: float 40s linear infinite; }
.animate-float-fast { animation: float 28s linear infinite; animation-delay: -5s; }

@keyframes sway {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}
.animate-sway { animation: sway 3s ease-in-out infinite; }
</style>