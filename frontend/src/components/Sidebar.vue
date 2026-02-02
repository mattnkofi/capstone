<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  LayoutDashboard, Map, BookOpen, HeartPulse, Users, 
  ShieldAlert, BrainCircuit, FileSearch, Settings, 
  LogOut, ChevronLeft, ChevronRight, Bell
} from 'lucide-vue-next'

const router = useRouter()
const isCollapsed = ref(false)
const user = ref(JSON.parse(localStorage.getItem('user')) || { role: 'learner', username: 'Matt Martin' })

// Navigation Configuration
const navigation = [
  // Common for All
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['learner', 'facilitator', 'admin'] },
  
  // Learner Specific
  { name: 'Learning Path', icon: Map, path: '/learning-path', roles: ['learner'] },
  { name: 'Modules', icon: BookOpen, path: '/resources', roles: ['learner'] },
  { name: 'Wellness', icon: HeartPulse, path: '/stress-meter', roles: ['learner'] },
  { name: 'Community', icon: Users, path: '/community', roles: ['learner', 'facilitator', 'admin'] },

  // Facilitator Specific
  { name: 'Class Analytics', icon: BrainCircuit, path: '/analytics', roles: ['facilitator', 'admin'] },
  { name: 'Student Progress', icon: FileSearch, path: '/student-logs', roles: ['facilitator', 'admin'] },
  { name: 'Early Alert', icon: Bell, path: '/alerts', roles: ['facilitator', 'admin'], critical: true },

  // Admin Specific
  { name: 'User Control', icon: Users, path: '/management', roles: ['admin'] },
  { name: 'Risk Queue', icon: ShieldAlert, path: '/admin-alerts', roles: ['admin'] },
  { name: 'Settings', icon: Settings, path: '/settings', roles: ['admin'] }
]

const filteredNav = computed(() => {
  return navigation.filter(item => item.roles.includes(user.value.role))
})

const handleLogout = () => {
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <aside :class="isCollapsed ? 'w-24' : 'w-72'" 
    class="fixed left-0 top-0 h-screen bg-[#020617]/95 backdrop-blur-3xl border-r border-white/5 p-6 transition-all duration-500 z-50 flex flex-col">
    
    <button @click="isCollapsed = !isCollapsed" 
      class="absolute -right-3 top-10 bg-pink-600 text-white p-1.5 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.4)] border-2 border-[#020617] hover:scale-110 transition-all">
      <ChevronLeft v-if="!isCollapsed" size="14" />
      <ChevronRight v-else size="14" />
    </button>

    <div class="flex items-center gap-4 mb-16 px-2">
      <div class="bg-gradient-to-br from-blue-600 to-pink-600 p-3 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] pulse-neon">
        <ShieldAlert class="w-6 h-6 text-white" />
      </div>
      <h1 v-if="!isCollapsed" class="text-2xl font-black italic uppercase text-white font-century tracking-tighter">ProtectEd</h1>
    </div>

    <nav class="flex-1 space-y-4 overflow-y-auto no-scrollbar">
      <router-link v-for="item in filteredNav" :key="item.name" :to="item.path" v-slot="{ isActive }">
        <div :class="[
          'group flex items-center gap-5 p-4 rounded-2xl transition-all border font-bold uppercase text-[10px] tracking-[0.4em] relative overflow-hidden',
          isActive 
            ? 'bg-blue-600/10 border-pink-500 text-white shadow-[0_0_25px_rgba(236,72,153,0.1)]' 
            : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5',
          item.critical ? 'border-l-4 border-l-pink-600' : ''
        ]">
          <div v-if="isActive" class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
          
          <component :is="item.icon" size="20" :class="isActive ? 'text-pink-500' : 'group-hover:text-blue-500'" class="transition-colors" />
          <span v-if="!isCollapsed" class="relative z-10">{{ item.name }}</span>
          
          <div v-if="isActive && !isCollapsed" class="ml-auto w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]"></div>
        </div>
      </router-link>
    </nav>

    <div class="pt-8 mt-4 border-t border-white/5">
      <div v-if="!isCollapsed" class="mb-6 px-5 py-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
        <p class="text-[8px] font-black text-blue-500 uppercase tracking-[0.5em] mb-1 italic">Role: {{ user.role }}</p>
        <p class="text-[10px] font-bold text-white truncate uppercase">{{ user.username }}</p>
      </div>
      <button @click="handleLogout" class="flex items-center gap-5 p-5 text-slate-600 font-bold text-[10px] tracking-[0.5em] hover:text-red-500 transition-all uppercase w-full group">
        <LogOut size="20" class="group-hover:-translate-x-1 transition-transform" />
        <span v-if="!isCollapsed">Terminate</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.font-century { font-family: "Century Gothic", "Apple Gothic", sans-serif; }
.pulse-neon { animation: pulse-ring 2s infinite; }
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>