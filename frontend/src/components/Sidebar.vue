<script setup>
import { BookOpen, BrainCircuit, Sun, ShieldAlert, LogOut } from 'lucide-vue-next'
</script>

<template>
  <aside class="fixed left-0 top-0 h-screen w-20 md:w-64 bg-brand-purple text-white flex flex-col items-center py-6 z-50 shadow-2xl">
    <div class="mb-12 flex items-center space-x-3 px-4">
      <div class="bg-brand-cyan p-2 rounded-xl shadow-lg shadow-brand-cyan/20">
        <ShieldAlert class="w-6 h-6 text-brand-purple" />
      </div>
      <h1 class="hidden md:block text-xl font-black tracking-tighter">ProtectEd</h1>
    </div>

    <nav class="flex-1 w-full space-y-2 px-3">
      <a href="#" class="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 border-r-4 border-brand-cyan">
        <BookOpen class="w-6 h-6 text-brand-cyan" />
        <span class="hidden md:block text-sm font-bold">Learning Path</span>
      </a>
      <a href="#" class="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition group">
        <BrainCircuit class="w-6 h-6 text-slate-300 group-hover:text-brand-cyan" />
        <span class="hidden md:block text-sm font-medium">AI Insights</span>
      </a>
      <a href="#" class="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition group">
        <Sun class="w-6 h-6 text-slate-300 group-hover:text-brand-cyan" />
        <span class="hidden md:block text-sm font-medium">Resources</span>
      </a>
    </nav>

    <button class="mb-4 flex items-center space-x-4 p-4 text-red-300 hover:text-red-100 transition">
      <LogOut class="w-6 h-6" />
      <span class="hidden md:block text-sm font-bold">Sign Out</span>
    </button>
  </aside>
</template>