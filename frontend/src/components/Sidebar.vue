<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-6 hidden md:block">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-blue-400">ProtectEd</h1>
      <p class="text-xs text-slate-400 uppercase tracking-widest mt-1">Platform for GAD</p>
    </div>

    <nav class="space-y-2">
      <a href="#" class="flex items-center space-x-3 p-3 rounded-lg bg-blue-600">
        <span>🏠</span>
        <span>Dashboard</span>
      </a>
      <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
        <span>📚</span>
        <span>Learning Hub</span>
      </a>
      <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
        <span>📊</span>
        <span>Analytics</span>
      </a>
      <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
        <span>🛡️</span>
        <span>VAWC Alerts</span>
      </a>
    </nav>

    <div class="absolute bottom-10 left-6 right-6 p-4 bg-slate-800 rounded-xl border border-slate-700">
      <p class="text-xs text-slate-400 mb-2">User Status</p>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span class="text-sm font-medium">Verified Learner</span>
      </div>
    </div>
  </aside>
</template>