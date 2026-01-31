<script setup>
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-vue-next'
import { ref } from 'vue'

const emit = defineEmits(['login'])
const role = ref('learner')

const handleLogin = () => {
  // Logic to pass the selected role back to App.vue
  emit('login', role.value)
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#F0F4FF] p-6">
    <div class="w-full max-w-md bg-white rounded-[48px] shadow-2xl p-10 border-b-8 border-slate-200 animate-in fade-in zoom-in duration-500">
      <div class="flex flex-col items-center text-center mb-10">
        <div class="bg-brand-cyan p-4 rounded-[24px] shadow-lg mb-4">
          <ShieldCheck class="w-10 h-10 text-brand-purple" />
        </div>
        <h2 class="text-3xl font-black text-brand-purple tracking-tighter uppercase leading-none">ProtectEd</h2>
        <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Authentication Portal</p>
      </div>

      <div class="space-y-6">
        <div class="relative">
          <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input type="text" placeholder="Username" class="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-cyan transition" />
        </div>
        
        <div class="relative">
          <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input type="password" placeholder="Password" class="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-cyan transition" />
        </div>

        <div class="flex bg-slate-50 p-1.5 rounded-2xl">
          <button @click="role = 'learner'" :class="role === 'learner' ? 'bg-white shadow-sm text-brand-purple' : 'text-slate-400'" class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Learner</button>
          <button @click="role = 'analytics'" :class="role === 'analytics' ? 'bg-white shadow-sm text-brand-purple' : 'text-slate-400'" class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Facilitator</button>
        </div>

        <button @click="handleLogin" class="w-full bg-brand-purple text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-[#3d3369] transition shadow-lg shadow-purple-100">
          <span>Enter Platform</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>