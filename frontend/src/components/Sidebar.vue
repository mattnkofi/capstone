<script setup>
import { BookOpen, Bell, BrainCircuit, Sun, Search } from 'lucide-vue-next'
</script>

<template>
  <aside class="fixed left-0 top-0 h-screen w-20 md:w-64 bg-[#4C4082] text-white flex flex-col items-center py-6">
    <div class="mb-10 flex items-center space-x-2 px-4">
      <div class="bg-[#00D4FF] p-1.5 rounded-lg">
        <ShieldAlert class="w-6 h-6 text-[#4C4082]" />
      </div>
      <h1 class="hidden md:block text-xl font-bold tracking-tight">ProtectEd</h1>
    </div>

    <nav class="flex-1 w-full space-y-4 px-2">
      <a href="#" class="group flex flex-col md:flex-row items-center md:space-x-4 p-3 rounded-xl bg-white/10 border-r-4 border-[#00D4FF]">
        <Bell class="w-6 h-6 text-[#00D4FF]" />
        <span class="hidden md:block text-sm font-medium">Learning Modules</span>
      </a>
      <a href="#" class="group flex flex-col md:flex-row items-center md:space-x-4 p-3 rounded-xl hover:bg-white/5 transition">
        <BrainCircuit class="w-6 h-6 text-slate-300" />
        <span class="hidden md:block text-sm font-medium">AI Insights</span>
      </a>
      <a href="#" class="group flex flex-col md:flex-row items-center md:space-x-4 p-3 rounded-xl hover:bg-white/5 transition">
        <Sun class="w-6 h-6 text-slate-300" />
        <span class="hidden md:block text-sm font-medium">Resources</span>
      </a>
    </nav>
  </aside>
</template>