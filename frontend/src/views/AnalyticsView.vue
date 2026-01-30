<script setup>
import { BrainCircuit, AlertTriangle, TrendingUp, Users } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-8 animate-in fade-in zoom-in duration-500">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-10 rounded-[48px] shadow-xl border border-red-50 relative overflow-hidden">
        <div class="flex items-center space-x-4 mb-8">
          <div class="bg-red-500 p-4 rounded-[24px] shadow-lg shadow-red-200">
            <AlertTriangle class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="text-2xl font-black text-slate-800 tracking-tighter uppercase">Risk Prediction</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Early Intervention Module</p>
          </div>
        </div>
        <div class="space-y-4">
          <div class="p-6 bg-red-50 rounded-[32px] border border-red-100 flex justify-between items-center group cursor-pointer hover:bg-red-100 transition">
            <p class="text-sm font-bold text-red-700">Cluster 4: High stress indicators detected</p>
            <div class="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition">
              <TrendingUp class="w-4 h-4 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-brand-purple p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
        <div class="flex justify-between items-start mb-10">
          <div>
            <p class="text-brand-cyan text-[10px] font-black uppercase tracking-[0.3em]">Platform Impact</p>
            <h3 class="text-4xl font-black italic tracking-tighter">Engagement</h3>
          </div>
          <Users class="w-10 h-10 text-white opacity-20" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white/10 p-6 rounded-[32px] border border-white/5">
            <p class="text-3xl font-black text-brand-cyan tracking-tighter">85%</p>
            <p class="text-[10px] font-bold uppercase opacity-60">Awareness Rate</p>
          </div>
          <div class="bg-white/10 p-6 rounded-[32px] border border-white/5">
            <p class="text-3xl font-black text-brand-pink tracking-tighter">1.2k</p>
            <p class="text-[10px] font-bold uppercase opacity-60">Active Learners</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>