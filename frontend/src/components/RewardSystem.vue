<script setup>
import { Trophy, Star, Medal, Sparkles, ChevronRight } from 'lucide-vue-next'
</script>

<template>
  <div class="max-w-xl mx-auto glass-card p-10 relative overflow-hidden group">
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-pink-100/30 rounded-full blur-[80px] transition-all group-hover:bg-pink-200/50"></div>
    
    <div class="flex justify-between items-start mb-10 relative z-10">
      <div>
        <div class="flex items-center space-x-2 text-pink-500 mb-2">
          <Sparkles class="w-4 h-4" />
          <p class="text-[10px] font-black uppercase tracking-[0.3em]">Achievement Terminal</p>
        </div>
        <h3 class="text-4xl font-black italic uppercase leading-[0.9] text-slate-800">Your<br/>Progress</h3>
      </div>
      <div class="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-[32px] shadow-xl shadow-pink-500/20">
        <Trophy class="w-10 h-10 text-white animate-pulse" />
      </div>
    </div>

    <div class="space-y-4 mb-10 relative z-10">
      <div class="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div class="flex items-center space-x-5">
          <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <Medal class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-black uppercase text-slate-800 italic">GAD Advocate</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">Status: Unlocked</p>
          </div>
        </div>
        <ChevronRight class="w-5 h-5 text-slate-300" />
      </div>
      
      <div class="flex items-center justify-between p-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl opacity-60 grayscale">
        <div class="flex items-center space-x-5">
          <div class="p-3 bg-slate-100 text-slate-400 rounded-2xl border border-slate-200">
            <Star class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-black uppercase text-slate-800 italic">VAWC Guardian</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">Status: Locked</p>
          </div>
        </div>
        <ChevronRight class="w-5 h-5 text-slate-300" />
      </div>
    </div>

    <button class="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl shadow-slate-900/20 hover:bg-blue-600 transition-all active:scale-95 relative z-10">
      Generate Digital Certificate
    </button>
  </div>
</template>