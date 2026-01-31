<script setup>
import { ref } from 'vue'
import { 
  ShieldAlert, LayoutDashboard, Map, HeartPulse, Library, Gift, 
  Settings, Users, Edit, BarChart3, UserCheck, BrainCircuit, 
  Microscope, FileOutput, LogOut, ChevronDown 
} from 'lucide-vue-next'

// Role state for toggling visibility
const userRole = ref('learner') 
const showRoleDropdown = ref(false)

const navigation = {
  common: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Learning Track', icon: Map, path: '/learning-path' },
    { name: 'Stressmeter', icon: HeartPulse, path: '/stress-meter' },
    { name: 'Resources', icon: Library, path: '/resources' },
    { name: 'Rewards', icon: Gift, path: '/rewards' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ],
  admin: [
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Content Management', icon: Edit, path: '/admin/content' },
    { name: 'AI Alerts', icon: ShieldAlert, path: '/admin/alerts' },
    { name: 'System Analytics', icon: BarChart3, path: '/analytics' },
  ],
  facilitator: [
    { name: 'Learner Tracking', icon: UserCheck, path: '/facilitator/tracking' },
    { name: 'Risk Dashboard', icon: BrainCircuit, path: '/facilitator/risks' },
  ],
  researcher: [
    { name: 'Research Data', icon: Microscope, path: '/researcher/data' },
    { name: 'Data Export', icon: FileOutput, path: '/researcher/export' },
  ]
}

const selectRole = (role) => {
  userRole.value = role
  showRoleDropdown.value = false
}
</script>

<template>
  <aside class="fixed left-6 top-6 bottom-6 w-64 bg-white border-[6px] border-black rounded-[40px] shadow-[16px_16px_0px_0px_#4C4082] flex flex-col p-6 z-50 overflow-y-auto no-scrollbar">
    
    <div class="relative mb-6 z-50">
      <button @click="showRoleDropdown = !showRoleDropdown" 
        class="w-full flex items-center justify-between p-3 bg-slate-900 text-white rounded-2xl border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all">
        <span>View as: {{ userRole }}</span>
        <ChevronDown class="w-4 h-4" />
      </button>
      
      <div v-if="showRoleDropdown" class="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] overflow-hidden">
        <button v-for="role in ['learner', 'admin', 'facilitator', 'researcher']" :key="role"
          @click="selectRole(role)"
          class="w-full p-3 text-left text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 border-b-2 border-black last:border-0">
          {{ role }}
        </button>
      </div>
    </div>

    <div class="flex items-center space-x-3 mb-8 bg-slate-100 p-4 rounded-3xl border-2 border-black">
      <div class="bg-cyan-400 border-2 border-black p-1.5 rounded-xl shadow-[4px_4px_0px_0px_black]">
        <ShieldAlert class="w-6 h-6 text-black" />
      </div>
      <h1 class="text-xl font-black uppercase italic tracking-tighter">ProtectEd</h1>
    </div>

    <nav class="flex-1 space-y-4">
      <div class="space-y-3">
        <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">General</p>
        <router-link v-for="item in navigation.common" :key="item.name" :to="item.path" v-slot="{ isActive }">
          <div :class="[
            'block w-full p-4 border-4 rounded-2xl transition-all group mb-2',
            isActive 
              ? 'bg-cyan-400 border-black shadow-[6px_6px_0px_0px_black] translate-x-[-4px] translate-y-[-4px]' 
              : 'border-transparent hover:border-black hover:bg-slate-50 hover:shadow-[6px_6px_0px_0px_black]'
          ]">
            <div class="flex items-center space-x-4">
              <component :is="item.icon" :class="['w-5 h-5', isActive ? 'text-black' : 'text-slate-400 group-hover:text-black']" />
              <span :class="['text-[10px] uppercase tracking-widest', isActive ? 'font-black text-black' : 'font-bold text-slate-500 group-hover:text-black']">
                {{ item.name }}
              </span>
            </div>
          </div>
        </router-link>
      </div>

      <div v-if="userRole === 'admin'" class="pt-4 border-t-4 border-slate-100 space-y-3">
        <p class="text-[9px] font-black text-rose-400 uppercase tracking-widest ml-2">System Admin</p>
        <router-link v-for="item in navigation.admin" :key="item.name" :to="item.path" v-slot="{ isActive }">
          <div :class="[
            'block w-full p-4 border-4 rounded-2xl transition-all group',
            isActive ? 'bg-rose-400 border-black shadow-[6px_6px_0px_0px_black] translate-x-[-4px] translate-y-[-4px]' : 'border-transparent hover:border-black hover:bg-rose-50 hover:shadow-[6px_6px_0px_0px_black]'
          ]">
            <div class="flex items-center space-x-4">
              <component :is="item.icon" :class="['w-5 h-5', isActive ? 'text-black' : 'text-rose-400 group-hover:text-black']" />
              <span :class="['text-[10px] uppercase tracking-widest', isActive ? 'font-black text-black' : 'font-bold text-slate-500 group-hover:text-black']">{{ item.name }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div v-if="userRole === 'facilitator'" class="pt-4 border-t-4 border-slate-100 space-y-3">
        <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest ml-2">Instructional</p>
        <router-link v-for="item in navigation.facilitator" :key="item.name" :to="item.path" v-slot="{ isActive }">
          <div :class="[
            'block w-full p-4 border-4 rounded-2xl transition-all group',
            isActive ? 'bg-emerald-400 border-black shadow-[6px_6px_0px_0px_black] translate-x-[-4px] translate-y-[-4px]' : 'border-transparent hover:border-black hover:bg-emerald-50 hover:shadow-[6px_6px_0px_0px_black]'
          ]">
            <div class="flex items-center space-x-4">
              <component :is="item.icon" :class="['w-5 h-5', isActive ? 'text-black' : 'text-emerald-400 group-hover:text-black']" />
              <span :class="['text-[10px] uppercase tracking-widest', isActive ? 'font-black text-black' : 'font-bold text-slate-500 group-hover:text-black']">{{ item.name }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </nav>

    <div class="mt-auto pt-6">
      <div class="flex items-center space-x-3 p-4 bg-rose-100 text-rose-600 rounded-3xl border-2 border-rose-600 cursor-pointer hover:bg-rose-600 hover:text-white transition-colors group">
        <LogOut class="w-5 h-5" />
        <span class="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>