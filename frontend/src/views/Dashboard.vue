<script setup>
import { ChevronRight } from 'lucide-vue-next'
</script>

<template>
  <div class="w-80 space-y-6">
    <div class="bg-white p-6 rounded-[32px] text-center shadow-sm">
      <div class="relative inline-block">
        <div class="w-24 h-24 bg-blue-100 rounded-full mx-auto overflow-hidden">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=user" alt="Avatar" />
        </div>
        <div class="absolute -bottom-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">Level 7</div>
      </div>
      <h4 class="mt-4 font-bold text-slate-800">Future Protector</h4>
      <div class="mt-4 flex items-center justify-between border-t pt-4">
        <div class="text-left">
          <p class="text-[10px] text-slate-400 font-bold uppercase">Points</p>
          <p class="text-xl font-black text-slate-800">1250</p>
        </div>
        <button class="bg-[#4C4082] text-white text-[10px] font-bold px-4 py-2 rounded-xl">Get Advice</button>
      </div>
    </div>

    <div class="bg-white p-6 rounded-[32px] shadow-sm">
      <p class="text-center text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Stressmeter</p>
      <div class="relative h-32 flex items-center justify-center">
        <div class="absolute inset-0 border-[16px] border-slate-100 rounded-t-full border-b-0"></div>
        <div class="absolute inset-0 border-[16px] border-[#00D4FF] rounded-t-full border-b-0" style="clip-path: inset(0 50% 0 0)"></div>
        <div class="text-center z-10">
          <p class="text-xs font-bold text-slate-600 leading-none">Feeling</p>
          <p class="text-lg font-black text-blue-500 italic">Calm</p>
        </div>
      </div>
      <button class="w-full mt-4 bg-blue-50 text-blue-600 text-[10px] font-black py-3 rounded-2xl hover:bg-blue-100 transition uppercase tracking-widest">
        Take a deep breath!
      </button>
    </div>
  </div>
</template>