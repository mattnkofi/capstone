<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const sidebarRef = ref(null)

const isPublic = computed(() => ['Landing', 'Login', 'Register'].includes(route.name))
</script>

<template>
  <div id="app" class="relative min-h-screen bg-[#020617] text-slate-200">
    <div class="fixed inset-0 z-0 pointer-events-none opacity-20" 
      style="background: radial-gradient(at 0% 0%, #2563eb 0, transparent 40%), radial-gradient(at 100% 100%, #ec4899 0, transparent 40%); animation: mesh-shift 30s infinite alternate;">
    </div>

    <div class="flex relative z-10 min-h-screen">
      <Sidebar v-if="!isPublic" ref="sidebarRef" />
      <main class="flex-1 transition-all duration-300" :class="[!isPublic ? (sidebarRef?.isCollapsed ? 'ml-20 p-8' : 'ml-64 p-12') : 'ml-0']">
        <router-view />
      </main>
    </div>
  </div>
</template>