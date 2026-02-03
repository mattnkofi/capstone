<script setup>
import { ref } from 'vue'
import { User, ShieldCheck, Trophy, Mail, Key, Coins, Save, Fingerprint } from 'lucide-vue-next'
import axios from 'axios'

const user = ref(JSON.parse(localStorage.getItem('user')) || { 
  id: null,
  username: 'Matt Martin', 
  email: 'operator@msu.edu.ph', 
  role: 'learner',
  points: 1250 
})

// Mock titles - these would ideally come from the database
const titles = ref(['GAD Advocate', 'VAWC Guardian', 'MSU Scholar'])
const isUpdating = ref(false)
const message = ref('')

const updateProfile = async () => {
  isUpdating.value = true
  try {
    // Ensure user.value.id exists in your localStorage 'user' object
    const res = await axios.put('http://localhost:3000/api/auth/update-profile', {
      id: user.value.id, 
      username: user.value.username,
      email: user.value.email
    })
    
    // Update local storage with new values
    localStorage.setItem('user', JSON.stringify(user.value))
    message.value = "Credentials Updated Successfully"
    setTimeout(() => message.value = "", 3000)
  } catch (err) {
    console.error(err)
    message.value = "Update failed. Check console for details."
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <div class="p-8 space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
    <header>
      <h2 class="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
        OPERATOR <span class="bg-gradient-to-r from-blue-500 to-pink-600 bg-clip-text text-transparent">DATA</span>
      </h2>
      <p class="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px] mt-4 italic">System Access Level: {{ user.role }}</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2 bg-[#0f172a] border border-white/5 p-10 rounded-2xl shadow-[14px_14px_0_0_#000] border-l-8 border-l-blue-600">
        <h3 class="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3">
          <Key class="w-5 h-5 text-blue-500" /> Security Credentials
        </h3>
        <div class="space-y-6">
          <div v-if="message" class="p-4 bg-blue-600/20 border border-blue-500 text-blue-500 font-bold text-[10px] uppercase tracking-widest rounded-xl">
            {{ message }}
          </div>
          <div>
            <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Username</label>
            <input v-model="user.username" type="text" class="w-full bg-[#020617] border border-white/10 p-4 text-white font-bold rounded-xl focus:border-blue-500 outline-none transition-all">
          </div>
          <div>
            <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Email Address</label>
            <input v-model="user.email" type="email" class="w-full bg-[#020617] border border-white/10 p-4 text-white font-bold rounded-xl focus:border-blue-500 outline-none transition-all">
          </div>
          <button @click="updateProfile" :disabled="isUpdating" 
            class="px-8 py-4 bg-blue-600 text-white font-black uppercase text-[11px] tracking-widest hover:bg-pink-600 transition-all shadow-[6px_6px_0_0_#000] flex items-center gap-3 active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50">
            <Save class="w-4 h-4" /> {{ isUpdating ? 'Processing...' : 'Sync to Server' }}
          </button>
        </div>
      </div>

      <div class="space-y-10">
        <div class="bg-[#0f172a] border border-white/5 p-10 rounded-2xl shadow-[14px_14px_0_0_#000] border-t-8 border-t-pink-600 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-pink-600/5 blur-3xl rounded-full"></div>
          <Coins class="w-10 h-10 text-pink-500 mx-auto mb-4 relative z-10" />
          <h4 class="text-5xl font-black text-white tracking-tighter relative z-10">{{ user.points || 0 }}</h4>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 relative z-10">Accumulated Points</p>
        </div>

        <div class="bg-[#0f172a] border border-white/5 p-8 rounded-2xl shadow-[14px_14px_0_0_#000] border-l-8 border-l-pink-600">
          <h3 class="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <Trophy class="w-4 h-4 text-pink-500" /> Earned Designations
          </h3>
          <div class="space-y-3">
            <div v-for="title in titles" :key="title" 
              class="p-4 bg-[#020617] border border-white/5 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-all group">
              <Fingerprint size="14" class="text-blue-500 group-hover:scale-110 transition-transform" />
              <span class="text-[10px] font-bold text-white uppercase tracking-widest">{{ title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>