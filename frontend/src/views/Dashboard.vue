<script setup>
import { TrendingUp, Award, Zap, Heart, Info, ChevronRight, AlertTriangle } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-700">
    <div class="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-200">
      <div class="space-y-1">
        <h3 class="text-xl font-bold">Daily Learning Goal</h3>
        <p class="text-blue-100 text-sm">Complete 2 more lessons to maintain your 5-day streak!</p>
      </div>
      <button class="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-50 transition shadow-md">
        Start Now
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div class="bg-blue-50 p-3 rounded-2xl">
            <TrendingUp class="w-6 h-6 text-blue-600" />
          </div>
          <span class="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
        </div>
        <p class="text-sm text-slate-500 font-bold uppercase tracking-tight">Progress</p>
        <h3 class="text-3xl font-black text-slate-800 mt-1">75%</h3>
        <div class="w-full bg-slate-100 h-3 rounded-full mt-4 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div class="bg-orange-50 p-3 rounded-2xl">
            <Heart class="w-6 h-6 text-orange-600" />
          </div>
          <button class="text-slate-400 hover:text-slate-600"><Info class="w-4 h-4" /></button>
        </div>
        <p class="text-sm text-slate-500 font-bold uppercase tracking-tight">Stressmeter</p>
        <div class="mt-4 space-y-3">
          <input type="range" min="1" max="100" class="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500">
          <div class="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span>Calm</span>
            <span>Balanced</span>
            <span class="text-red-400 font-black">High Stress</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div class="bg-yellow-50 p-3 rounded-2xl">
            <Award class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <p class="text-sm text-slate-500 font-bold uppercase tracking-tight">Rewards</p>
        <h3 class="text-3xl font-black text-slate-800 mt-1">12 <span class="text-lg font-normal text-slate-400">Badges</span></h3>
        <div class="flex mt-4 -space-x-2">
          <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full border-4 border-white bg-yellow-400 flex items-center justify-center shadow-sm">
            <Zap class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-red-50/50 p-6 rounded-3xl border border-red-100 relative overflow-hidden">
      <div class="absolute top-0 right-0 p-8 opacity-10">
        <ShieldAlert class="w-32 h-32 text-red-600" />
      </div>
      <div class="flex items-center space-x-3 mb-6">
        <AlertTriangle class="text-red-600 w-6 h-6" />
        <h3 class="font-black text-slate-800 tracking-tight">AI Risk Detection</h3>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-red-100 shadow-sm flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <ShieldAlert class="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p class="font-bold text-slate-800">Unusual Activity Flagged</p>
            <p class="text-xs text-slate-500">Module 3 behavior patterns show high stress indicators.</p>
          </div>
        </div>
        <button class="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800">
          Analyze Pattern
        </button>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-black text-slate-800 text-lg">Next Learning Modules</h3>
        <button class="text-blue-600 text-sm font-bold flex items-center">View Library <ChevronRight class="w-4 h-4" /></button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="title in ['Digital Consent', 'Prevention Strategies']" :key="title" 
             class="group p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-500 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50">
                <BookOpen class="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
              </div>
              <div>
                <h4 class="font-bold text-slate-800">{{ title }}</h4>
                <p class="text-xs text-slate-400">15 mins • Beginner</p>
              </div>
            </div>
            <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <ChevronRight class="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>