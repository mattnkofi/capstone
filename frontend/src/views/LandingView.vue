<script setup>
import { Cpu, Network, ArrowRight, ShieldCheck } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-[#020617]">
    <div class="absolute top-0 -left-10 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-0 -right-10 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full"></div>

    <div class="max-w-4xl w-full z-10 text-center space-y-10">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
        <ShieldCheck class="w-4 h-4 text-blue-400" />
        <span class="text-xs font-semibold text-slate-300 uppercase tracking-widest">Enterprise Security Intelligence</span>
      </div>

      <h1 class="text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
        Protect<span class="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">Ed</span> Intelligence
      </h1>

      <p class="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
        A professional behavioral analytics platform designed for MSU-Calapan. Secure your institution with data-driven prevention modules.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <router-link to="/login" class="btn-gradient w-48 text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
          Initialize <ArrowRight size="18" />
        </router-link>
        <router-link to="/register" class="w-48 px-6 py-3 rounded-lg border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-all">
          Register Organization
        </router-link>
      </div>
    </div>
  </div>
</template>