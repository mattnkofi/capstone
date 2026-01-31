<script setup>
import { ShieldAlert, Bell, BrainCircuit, Sun, Search } from 'lucide-vue-next'
</script>

<template>
  <aside class="fixed left-6 top-6 bottom-6 w-64 bg-white border-[6px] border-black rounded-[40px] shadow-[16px_16px_0px_0px_#4C4082] flex flex-col p-6 z-50">
    <div class="flex items-center space-x-3 mb-12 bg-slate-100 p-4 rounded-3xl border-2 border-black">
      <div class="bg-brand-cyan border-2 border-black p-1.5 rounded-xl shadow-[4px_4px_0px_0px_black]">
        <ShieldAlert class="w-6 h-6 text-black" />
      </div>
      <h1 class="text-xl font-black uppercase italic tracking-tighter">ProtectEd</h1>
    </div>

    <nav class="flex-1 space-y-6">
      <a href="#" class="block w-full p-4 bg-brand-cyan border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] translate-x-[-4px] translate-y-[-4px]">
        <div class="flex items-center space-x-4">
          <Bell class="w-6 h-6 text-black" />
          <span class="font-black text-xs uppercase tracking-widest">Learning Track</span>
        </div>
      </a>

      <a href="#" class="block w-full p-4 border-4 border-transparent hover:border-black hover:bg-slate-50 hover:shadow-[6px_6px_0px_0px_black] transition-all rounded-2xl group">
        <div class="flex items-center space-x-4">
          <BrainCircuit class="w-6 h-6 text-slate-400 group-hover:text-brand-pink" />
          <span class="font-bold text-xs uppercase text-slate-500 group-hover:text-black">AI Insights</span>
        </div>
      </a>

      <a href="#" class="block w-full p-4 border-4 border-transparent hover:border-black hover:bg-slate-50 hover:shadow-[6px_6px_0px_0px_black] transition-all rounded-2xl group">
        <div class="flex items-center space-x-4">
          <Sun class="w-6 h-6 text-slate-400 group-hover:text-brand-pink" />
          <span class="font-bold text-xs uppercase text-slate-500 group-hover:text-black">Resources</span>
        </div>
      </a>
    </nav>

    <div class="mt-auto px-2">
      <div class="flex items-center space-x-3 p-4 bg-black text-white rounded-3xl border-2 border-black cursor-pointer hover:bg-brand-purple transition-colors">
        <Search class="w-5 h-5 text-brand-cyan" />
        <span class="text-[10px] font-black uppercase tracking-widest">Search System</span>
      </div>
    </div>
  </aside>
</template>