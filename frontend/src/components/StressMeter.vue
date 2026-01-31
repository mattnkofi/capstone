<script setup>
import { Wind, HeartPulse } from 'lucide-vue-next'
import { ref } from 'vue'

const stressLevel = ref(30)
</script>

<template>
  <div class="bg-brand-purple p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
    <div class="relative z-10">
      <div class="flex justify-between items-center mb-6">
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">Wellness Module</p>
        <HeartPulse class="w-5 h-5 text-brand-pink animate-pulse" />
      </div>
      
      <h3 class="text-2xl font-black mb-2 italic">How are you feeling?</h3>
      <p class="text-white/60 text-xs mb-6">Move the slider to report your current stress level.</p>
      
      <input type="range" v-model="stressLevel" class="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-cyan mb-6">
      
      <div class="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div class="flex items-center space-x-3">
          <Wind class="w-5 h-5 text-brand-cyan" />
          <p class="text-[11px] leading-relaxed font-medium">
            <span class="block font-black text-brand-cyan uppercase">Regulation Tip:</span>
            {{ stressLevel > 60 ? 'Take a break and try the Box Breathing module.' : 'You are in the green zone! Keep exploring.' }}
          </p>
        </div>
      </div>
    </div>
    <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-cyan/20 blur-[80px] rounded-full group-hover:bg-brand-cyan/40 transition-all"></div>
  </div>
</template>