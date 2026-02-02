<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
// Detect if we are in the viewer to strip away the dashboard UI
const isFullPage = computed(() => route.name === 'DocumentViewer')
</script>

<template>
  <div class="flex min-h-screen bg-[#f8fafc]">
    <Sidebar v-if="!isFullPage" />

    <main 
      :class="[
        'flex-1 transition-all duration-500',
        isFullPage ? 'ml-0' : 'ml-72 p-8' 
      ]"
    >
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity 0.3s ease;
}
.page-fade-enter-from, .page-fade-leave-to {
  opacity: 0;
}
</style>