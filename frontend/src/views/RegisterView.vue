<script setup>
import { ShieldPlus, User, Mail, Lock, ArrowRight, CheckCircle, ChevronLeft } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const role = ref('learner')
const error = ref('')
const showModal = ref(false)

const handleRegister = async () => {
  error.value = ''
  try {
    await api.register({
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value
    })
    showModal.value = true
  } catch (err) {
    error.value = err.response?.data?.error || "Registration failed"
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#F0F4FF] p-6 relative">
    <router-link to="/" class="absolute top-10 left-10 flex items-center gap-2 text-slate-400 font-black uppercase text-[10px]">
      <ChevronLeft class="w-4 h-4" /> Back to Home
    </router-link>

    <div class="w-full max-w-md bg-white rounded-[48px] shadow-2xl p-10 border-b-8 border-slate-200">
      <div class="flex flex-col items-center text-center mb-10">
        <div class="bg-cyan-400 p-4 rounded-[24px] shadow-lg mb-4"><ShieldPlus class="w-10 h-10 text-indigo-600" /></div>
        <h2 class="text-3xl font-black text-indigo-600 uppercase">Join ProtectEd</h2>
        <p v-if="error" class="text-red-600 text-xs font-bold mt-4 bg-red-50 p-3 rounded-xl w-full">{{ error }}</p>
      </div>
      <div class="space-y-4">
        <input v-model="username" type="text" placeholder="Full Name" class="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700" />
        <input v-model="email" type="email" placeholder="Email Address" class="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700" />
        <input v-model="password" type="password" placeholder="Password" class="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700" />
        <div class="flex bg-slate-50 p-1.5 rounded-2xl">
          <button @click="role = 'learner'" :class="role === 'learner' ? 'bg-white text-indigo-600' : 'text-slate-400'" class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase">Learner</button>
          <button @click="role = 'facilitator'" :class="role === 'facilitator' ? 'bg-white text-indigo-600' : 'text-slate-400'" class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase">Facilitator</button>
        </div>
        <button @click="handleRegister" class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center space-x-3 shadow-lg">
          <span>Sign Up</span> <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-indigo-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div class="bg-white rounded-[48px] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in">
        <CheckCircle class="w-20 h-20 text-emerald-500 mx-auto mb-6" />
        <h3 class="text-2xl font-black text-slate-800 uppercase italic">Check Email!</h3>
        <p class="text-slate-500 font-bold text-sm mt-4 mb-8">We've sent a verification link to your email!</p>
        <button @click="router.push('/login')" class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs shadow-lg">Back to Login</button>
      </div>
    </div>
  </div>
</template>