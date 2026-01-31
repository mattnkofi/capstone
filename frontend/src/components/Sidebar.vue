<script setup>
import { ShieldAlert, Bell, BrainCircuit, Sun, Search } from 'lucide-vue-next'
</script>

<template>
  <aside class="fixed left-4 top-4 bottom-4 w-20 md:w-64 bg-brand-purple/90 backdrop-blur-xl text-white flex flex-col items-center py-8 rounded-[32px] border border-white/20 shadow-[20px_0_40px_rgba(0,0,0,0.1)] z-50">
    
    <div class="mb-12 flex items-center space-x-3 px-6 group cursor-pointer">
      <div class="bg-gradient-to-br from-brand-cyan to-brand-purple p-2.5 rounded-2xl shadow-[0_10px_20px_rgba(0,212,255,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <ShieldAlert class="w-6 h-6 text-white" />
      </div>
      <h1 class="hidden md:block text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
        ProtectEd
      </h1>
    </div>

    <nav class="flex-1 w-full px-4 space-y-6">
      <a href="#" class="relative group flex flex-col md:flex-row items-center md:space-x-4 p-4 rounded-2xl bg-gradient-to-r from-white/10 to-transparent border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all">
        <div class="absolute left-0 w-1.5 h-8 bg-brand-cyan rounded-r-full shadow-[4px_0_15px_rgba(0,212,255,0.8)]"></div>
        
        <Bell class="w-6 h-6 text-brand-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
        <span class="hidden md:block text-sm font-bold tracking-wide">Learning Path</span>
      </a>

      <a href="#" class="group flex flex-col md:flex-row items-center md:space-x-4 p-4 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 hover:translate-x-1">
        <BrainCircuit class="w-6 h-6 group-hover:text-brand-pink transition-colors" />
        <span class="hidden md:block text-sm font-medium">AI Insights</span>
      </a>

      <a href="#" class="group flex flex-col md:flex-row items-center md:space-x-4 p-4 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 hover:translate-x-1">
        <Sun class="w-6 h-6 group-hover:text-brand-pink transition-colors" />
        <span class="hidden md:block text-sm font-medium">Resources</span>
      </a>
    </nav>

    <div class="w-full px-4 mt-auto">
      <div class="flex items-center justify-center md:justify-start space-x-4 p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-brand-pink/50 transition-colors cursor-pointer group">
        <Search class="w-5 h-5 text-slate-400 group-hover:text-brand-pink" />
        <span class="hidden md:block text-xs text-slate-400 font-bold uppercase tracking-widest">Search</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Adding a soft edge glow to the sidebar */
aside {
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    10px 20px 40px rgba(0, 0, 0, 0.2);
}
</style>