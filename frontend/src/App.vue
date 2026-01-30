<script setup>
import Sidebar from './components/Sidebar.vue'
import Dashboard from './views/Dashboard.vue' // We will create this next
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <Sidebar />

    <main class="flex-1 md:ml-64 p-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold text-slate-800">Welcome back, User!</h2>
          <p class="text-slate-500">Track your progress and learning path here.</p>
        </div>
        
        <div class="bg-white shadow-sm border p-3 rounded-2xl flex items-center space-x-3">
          <span class="text-xl">🏆</span>
          <div>
            <p class="text-xs text-slate-400 leading-none">Total Points</p>
            <p class="text-lg font-bold text-slate-800">1,250</p>
          </div>
        </div>
      </header>

      <Dashboard />
    </main>
  </div>
</template>