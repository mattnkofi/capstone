<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex min-h-screen bg-[#E0E7FF] p-6">
    <Sidebar />

    <main class="flex-1 ml-72">
      <router-view></router-view>
    </main>
  </div>
</template>