<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p class="text-sm text-slate-500 font-medium">Learning Progress</p>
        <div class="mt-2 flex items-end justify-between">
          <h3 class="text-2xl font-bold text-slate-800">75%</h3>
          <span class="text-green-500 text-sm font-medium">↑ 12% this week</span>
        </div>
        <div class="w-full bg-slate-100 h-2 rounded-full mt-4">
          <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex justify-between items-start">
          <p class="text-sm text-slate-500 font-medium">Stressmeter</p>
          <span class="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-lg font-bold">Action Needed</span>
        </div>
        <div class="mt-4 flex flex-col items-center">
          <input type="range" class="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer">
          <p class="mt-2 text-xs text-slate-400 italic">"Try a 5-minute breathing exercise"</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p class="text-sm text-slate-500 font-medium">Badges Earned</p>
        <div class="mt-3 flex -space-x-2">
          <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-lg">
            🏅
          </div>
          <div class="w-10 h-10 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-bold">
            +2
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
      <div class="flex items-center space-x-2 mb-4">
        <span class="text-red-500">🛡️</span>
        <h3 class="font-bold text-slate-800">AI-Powered Risk Alerts</h3>
      </div>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
          <div class="flex items-center space-x-3">
            <span class="w-2 h-2 bg-red-500 rounded-full"></span>
            <p class="text-sm text-red-800 font-medium text-left">Potential high-stress behavior pattern detected in Module 3.</p>
          </div>
          <button class="text-xs font-bold text-red-600 uppercase tracking-wider">Review</button>
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-bold text-slate-800 mb-4">Continue Learning</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="group p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-300 transition cursor-pointer text-left">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-bold text-blue-600 uppercase mb-1">Sex Education</p>
              <h4 class="font-bold text-slate-800">Understanding Boundaries</h4>
            </div>
            <span class="text-slate-300 group-hover:text-blue-500 transition">→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>