<script setup>
import { BrainCircuit, AlertTriangle, TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-8 shadow-sm border border-slate-100">
      <div class="flex items-center space-x-3 mb-6">
        <div class="bg-purple-100 p-3 rounded-2xl">
          <BrainCircuit class="text-brand-purple w-6 h-6" />
        </div>
        <h3 class="font-black text-slate-800 uppercase tracking-widest text-sm">Behavioral Analysis</h3>
      </div>
      <div class="space-y-4">
        <div class="p-4 bg-red-50 rounded-2xl border border-red-100 flex justify-between items-center">
          <p class="text-xs font-bold text-red-700">Predictive Alert: High Risk Pattern in Cluster B</p>
          <AlertTriangle class="text-red-500 w-5 h-5" />
        </div>
        <div class="h-32 flex items-end space-x-2 px-2">
          <div v-for="h in [40, 70, 45, 90, 65]" :key="h" :style="{ height: h + '%' }" class="flex-1 bg-brand-cyan/20 rounded-t-lg hover:bg-brand-cyan transition-colors cursor-pointer"></div>
        </div>
      </div>
    </div>

    <div class="bg-white p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-6">
        <div class="bg-cyan-100 p-3 rounded-2xl">
          <TrendingUp class="text-brand-cyan w-6 h-6" />
        </div>
        <h3 class="font-black text-slate-800 uppercase tracking-widest text-sm">Learning Impact</h3>
      </div>
      <div class="space-y-6">
        <div v-for="label in ['Awareness', 'Prevention Skills']" :key="label">
          <div class="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">{{ label }} <span>85%</span></div>
          <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div class="bg-brand-purple h-full rounded-full" style="width: 85%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>