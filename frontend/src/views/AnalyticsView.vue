<script setup>
import { ref } from 'vue'
import { BrainCircuit, Users, TrendingUp, AlertTriangle } from 'lucide-vue-next'

const classStats = [
  { student: 'Student_01', progress: '92%', risk: 'Low' },
  { student: 'Student_02', progress: '45%', risk: 'Moderate' },
  { student: 'Student_03', progress: '12%', risk: 'High' }
]
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
    <header>
      <h2 class="text-3xl font-black text-white italic uppercase tracking-tighter font-gothic">Class <span class="text-pink-500">Analytics</span></h2>
      <p class="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">Real-time Group Oversight & Predictive Data</p>
    </header>

    <div class="bg-[#0f172a] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-[#020617] border-b border-white/5">
          <tr>
            <th class="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Student</th>
            <th class="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Completion</th>
            <th class="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">AI Risk Level</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="s in classStats" :key="s.student" class="hover:bg-white/5 transition-colors group">
            <td class="p-6 text-[11px] font-bold text-white uppercase">{{ s.student }}</td>
            <td class="p-6 text-[11px] font-bold text-blue-500">{{ s.progress }}</td>
            <td class="p-6">
              <span :class="[
                s.risk === 'High' ? 'text-pink-500 bg-pink-500/10' : 
                s.risk === 'Moderate' ? 'text-amber-500 bg-amber-500/10' : 'text-emerald-500 bg-emerald-500/10'
              ]" class="px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest border border-current opacity-70">
                {{ s.risk }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>