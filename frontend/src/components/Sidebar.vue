<script setup>
import { ref } from 'vue'
import { 
  ShieldAlert, LayoutDashboard, Map, HeartPulse, Library, Gift, 
  Settings, Users, Edit, BarChart3, UserCheck, BrainCircuit, 
  Microscope, FileOutput, LogOut, ChevronLeft, ChevronRight, ChevronDown 
} from 'lucide-vue-next'

const isCollapsed = ref(false)
const userRole = ref('learner') 
const showRoleDropdown = ref(false)

const navigation = {
  common: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Learning Track', icon: Map, path: '/learning-path' },
    { name: 'Stressmeter', icon: HeartPulse, path: '/stress-meter' },
    { name: 'Resources', icon: Library, path: '/resources' },
    { name: 'Rewards', icon: Gift, path: '/rewards' },
  ],
  admin: [
    { name: 'System Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
  ]
}

const selectRole = (role) => {
  userRole.value = role
  showRoleDropdown.value = false
}
</script>

<template>
  <aside 
    :class="[isCollapsed ? 'w-20' : 'w-72']" 
    class="fixed left-0 top-0 bottom-0 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transition-all duration-300 z-50 flex flex-col p-4"
  >
    <button 
      @click="isCollapsed = !isCollapsed" 
      class="absolute -right-3 top-10 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:text-blue-600 transition-colors cursor-pointer"
    >
      <ChevronLeft v-if="!isCollapsed" class="w-4 h-4" />
      <ChevronRight v-else class="w-4 h-4" />
    </button>

    <div class="flex items-center space-x-3 mb-10 px-2 overflow-hidden">
      <div class="bg-gradient-to-br from-blue-600 to-pink-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 shrink-0">
        <ShieldAlert class="w-6 h-6 text-white" />
      </div>
      <h1 v-if="!isCollapsed" class="text-xl font-black uppercase italic tracking-tighter text-slate-800 whitespace-nowrap">
        Protect<span class="text-blue-600">Ed</span>
      </h1>
    </div>

    <div v-if="!isCollapsed" class="relative mb-8 px-2">
      <button @click="showRoleDropdown = !showRoleDropdown" 
        class="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all">
        <span>{{ userRole }} View</span>
        <ChevronDown class="w-3 h-3 transition-transform" :class="{'rotate-180': showRoleDropdown}" />
      </button>
      
      <div v-if="showRoleDropdown" class="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-10 overflow-hidden">
        <button v-for="role in ['learner', 'admin', 'facilitator']" :key="role"
          @click="selectRole(role)"
          class="w-full p-3 text-left text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-colors">
          {{ role }}
        </button>
      </div>
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto no-scrollbar">
      <p v-if="!isCollapsed" class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>
      
      <router-link v-for="item in navigation.common" :key="item.name" :to="item.path" v-slot="{ isActive }">
        <div :class="[
          'flex items-center space-x-3 px-3 py-3 rounded-xl transition-all group cursor-pointer mb-1',
          isActive 
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' 
            : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
        ]">
          <component :is="item.icon" class="w-5 h-5 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-bold whitespace-nowrap">{{ item.name }}</span>
        </div>
      </router-link>

      <div v-if="userRole === 'admin'" class="pt-6 mt-6 border-t border-slate-100">
        <p v-if="!isCollapsed" class="text-[9px] font-black text-pink-500 uppercase tracking-widest px-4 mb-2">Systems</p>
        <router-link v-for="item in navigation.admin" :key="item.name" :to="item.path" v-slot="{ isActive }">
          <div :class="[
            'flex items-center space-x-3 px-3 py-3 rounded-xl transition-all group cursor-pointer mb-1',
            isActive 
              ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-500/30' 
              : 'text-slate-500 hover:bg-pink-50/50 hover:text-pink-600'
          ]">
            <component :is="item.icon" class="w-5 h-5 shrink-0" />
            <span v-if="!isCollapsed" class="text-sm font-bold whitespace-nowrap">{{ item.name }}</span>
          </div>
        </router-link>
      </div>
    </nav>

    <div class="pt-4 border-t border-slate-100">
      <div class="flex items-center space-x-3 p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer group">
        <LogOut class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed" class="text-sm font-black uppercase tracking-widest">Logout</span>
      </div>
    </div>
  </aside>
</template>