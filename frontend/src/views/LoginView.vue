<script setup>
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    const res = await api.login({ email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed. Please check your credentials.'
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#F0F4FF] p-6">
    <div class="w-full max-w-md bg-white rounded-[48px] shadow-2xl p-10 border-b-8 border-slate-200">
      <div class="flex flex-col items-center text-center mb-10">
        <div class="bg-cyan-400 p-4 rounded-[24px] shadow-lg mb-4">
          <ShieldCheck class="w-10 h-10 text-indigo-600" />
        </div>
        <h2 class="text-3xl font-black text-indigo-600 uppercase">Login</h2>
        <p v-if="error" class="text-red-500 text-xs font-bold mt-4 bg-red-50 p-2 rounded-lg w-full">{{ error }}</p>
      </div>

      <div class="space-y-6">
        <div class="relative">
          <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input v-model="email" type="email" placeholder="Email" class="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-cyan-400 transition" />
        </div>
        
        <div class="relative">
          <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input v-model="password" type="password" placeholder="Password" class="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-cyan-400 transition" />
        </div>

        <button @click="handleLogin" class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center space-x-3 shadow-lg">
          <span>Enter Portal</span> <ArrowRight class="w-4 h-4" />
        </button>
        <p class="text-center text-[10px] font-bold text-slate-400 mt-4">
          No account? <router-link to="/register" class="text-indigo-600 underline">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>