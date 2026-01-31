<script setup>
import { Trophy, Star, Medal } from 'lucide-vue-next'
</script>

<template>
  <div class="pop-3d p-8 bg-black text-black rounded-[40px] border-[6px] border-black shadow-[12px_12px_0_0_#FF7EB3]">
    <div class="flex justify-between items-start mb-8">
      <div>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] mb-1">MinSU GAD Rewards</p>
        <h3 class="text-2xl font-black italic uppercase leading-none">Achievement<br/>Terminal</h3>
      </div>
      <Trophy class="w-10 h-10 text-brand-pink animate-bounce" />
    </div>

    <div class="space-y-4 mb-8">
      <div class="flex items-center space-x-4 p-3 bg-white/10 rounded-2xl border border-white/20">
        <div class="p-2 bg-brand-cyan rounded-lg border-2 border-black">
          <Medal class="w-5 h-5 text-black" />
        </div>
        <div>
          <p class="text-[10px] font-black uppercase">GAD Advocate Badge</p>
          <p class="text-[8px] text-black italic uppercase">Earned for completing Basics</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-4 p-3 bg-white/5 rounded-2xl border border-white/5 opacity-50">
        <div class="p-2 bg-slate-600 rounded-lg border-2 border-black">
          <Star class="w-5 h-5 text-black" />
        </div>
        <p class="text-[10px] font-black uppercase">VAWC Guardian Badge (Locked)</p>
      </div>
    </div>

    <button class="w-full py-4 bg-white border-4 border-black text-black font-black uppercase text-xs rounded-2xl shadow-[6px_6px_0px_0px_#FF7EB3] active:translate-y-2 active:shadow-none transition-all">
      Claim Physical Certificate
    </button>
  </div>
</template>