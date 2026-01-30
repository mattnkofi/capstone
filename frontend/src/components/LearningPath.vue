<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';

const modules = ref([]);

onMounted(async () => {
  try {
    const response = await api.getLearningPath(1); // Hardcoded user ID for demo
    modules.value = response.data;
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
</script>

<template>
  <div class="relative w-full h-[700px] bg-white/40 rounded-[50px] border-b-8 border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
    <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-10">
      <path d="M200,100 C400,100 500,300 600,400 S300,600 400,700" fill="none" stroke="#4C4082" stroke-width="80" stroke-linecap="round" />
    </svg>

    <div v-for="m in modules" :key="m.id" :style="{ top: m.top, left: m.left }" class="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer text-center">
      <div :class="[m.color, 'w-24 h-24 rounded-full p-1 border-8 border-white shadow-2xl transition-all group-hover:scale-110 group-hover:-translate-y-3 relative']">
        <img :src="`https://api.dicebear.com/${m.bot}/svg?seed=${m.id}`" class="w-full h-full" />
        <div v-if="m.status === 'completed'" class="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white animate-bounce">
          <CheckCircle2 class="w-4 h-4 text-white" />
        </div>
        <div v-if="m.status === 'locked'" class="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center">
          <Lock class="w-6 h-6 text-white" />
        </div>
      </div>
      <div class="mt-4 bg-brand-purple text-white px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-lg inline-block whitespace-nowrap">
        {{ m.title }}
      </div>
    </div>
  </div>
</template>