<script setup>
import { ShieldAlert, Cpu, Network, ArrowRight, Activity } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 overflow-hidden">
    <div v-for="n in 6" :key="n" class="node-float rounded-full" 
      :style="{ width: (n*30)+'px', height: (n*30)+'px', left: (n*15)+'%', bottom: '-100px', animationDelay: (n*3)+'s' }"></div>

    <div class="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div class="flex items-center justify-center gap-4 mb-8">
        <Cpu class="w-5 h-5 text-blue-500 animate-pulse" />
        <div class="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-pink-500"></div>
        <Network class="w-5 h-5 text-pink-500" />
      </div>

      <h1 class="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
        Protect<span class="text-blue-500">Ed</span> <br/>
        <span class="text-xs font-bold tracking-[0.5em] text-slate-500 block mt-4 italic">Corporate Security Intelligence</span>
      </h1>

      <div class="flex gap-4 justify-center pt-8">
        <router-link to="/login" class="panel-sharp px-8 py-4 bg-blue-600/10 border-blue-500/50 text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-3">
          Initialize <Activity class="w-4 h-4" />
        </router-link>
        <router-link to="/register" class="panel-sharp px-8 py-4 bg-pink-600/10 border-pink-500/50 text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-3">
          Enroll <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
    </div>
  </div>
</template>