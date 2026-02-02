<script setup>
import { ref } from 'vue'
import { Activity, Zap, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, TrendingUp } from 'lucide-vue-next'

const showSaveModal = ref(false)
const isSaving = ref(false)

const confirmSave = () => {
  isSaving.value = true
  setTimeout(() => { isSaving.value = false; showSaveModal.value = false; }, 1500)
}
</script>

<template>
  <div class="space-y-12 animate-in fade-in duration-700">
    <header class="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
      <div>
        <h2 class="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
          SYSTEM <span class="bg-gradient-to-r from-blue-500 to-pink-600 bg-clip-text text-transparent">OVERVIEW</span>
        </h2>
        <p class="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px] mt-4 italic">Operator: Matt Martin | MSU - Calapan Campus</p>
      </div>
      <button @click="showSaveModal = true" 
        class="px-10 py-5 bg-blue-600 text-white font-black uppercase text-[11px] tracking-widest hover:bg-pink-600 transition-all shadow-[10px_10px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">
        SAVE SESSION
      </button>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="bg-[#0f172a] border border-white/5 p-10 rounded-2xl shadow-[14px_14px_0_0_#000] border-l-8 border-l-blue-600 relative overflow-hidden group">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
        <TrendingUp class="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
        <h3 class="text-6xl font-black text-white tracking-tighter">92%</h3>
        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 italic">AI Accuracy Rating</p>
      </div>

      <div class="lg:col-span-2 bg-[#0f172a] border border-white/5 p-10 rounded-2xl shadow-[14px_14px_0_0_#000] border-l-8 border-l-pink-600 relative">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
            <AlertTriangle class="w-5 h-5 text-pink-500" /> Risk Notifications
          </h3>
          <span class="text-[9px] font-black text-pink-500 uppercase tracking-widest bg-pink-500/10 px-3 py-1 rounded">2 New Alerts</span>
        </div>
        <div class="space-y-4">
          <div class="p-5 bg-[#020617] border border-white/5 rounded-xl flex items-center justify-between hover:border-pink-500/50 transition-all cursor-pointer">
            <div class="flex items-center gap-6">
              <div class="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
              <span class="font-bold text-white uppercase text-xs tracking-widest">Behavioral Pattern detected: VAWC Risk Alert</span>
            </div>
            <span class="text-[9px] font-bold text-slate-500 uppercase">10m ago</span>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <h3 class="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-blue-600 pl-4">Prevention Modules</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div v-for="n in ['Sex Education', 'VAWC Prevention', 'GAD Basics']" :key="n" 
          class="bg-[#0f172a] border border-white/5 p-8 rounded-2xl shadow-[10px_10px_0_0_#000] hover:translate-y-[-4px] transition-all cursor-pointer border-b-4 border-b-blue-600">
          <div class="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
            <Zap class="w-6 h-6 text-blue-500" />
          </div>
          <h4 class="text-lg font-black text-white uppercase tracking-widest">{{ n }}</h4>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">12 Interactive Lessons</p>
          <div class="w-full h-1.5 bg-[#020617] rounded-full mt-6 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-pink-500 h-full w-[65%]"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSaveModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div class="bg-[#0f172a] p-12 max-w-md w-full text-center border-t-8 border-t-pink-600 shadow-[20px_20px_0_0_#000] rounded-sm">
        <ShieldAlert class="w-16 h-16 text-pink-600 mx-auto mb-6 animate-pulse" />
        <h3 class="text-2xl font-black text-white uppercase italic tracking-tighter">Are you sure?</h3>
        <p class="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4 mb-10 leading-relaxed">This will save your current progress and AI analysis state to the MSU server.</p>
        
        <div class="flex gap-4">
          <button @click="showSaveModal = false" class="flex-1 py-4 bg-white/5 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all border border-white/5">
            <XCircle class="w-4 h-4 mx-auto mb-2" /> Cancel
          </button>
          <button @click="confirmSave" class="flex-1 py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-pink-600 transition-all shadow-xl">
            <span v-if="isSaving" class="animate-spin block w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></span>
            <CheckCircle2 v-else class="w-4 h-4 mx-auto mb-2" />
            {{ isSaving ? 'Saving...' : 'Yes, Save' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>