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
const loading = ref(false)

const handleRegister = async () => {
  if (!username.value || !email.value || !password.value) {
    error.value = "Please fill in all fields"
    return
  }
  
  error.value = ''
  loading.value = true
  
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
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#F0F4FF] p-6 relative font-sans">
    <router-link to="/" class="absolute top-10 left-10 flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] hover:text-indigo-600 transition-colors">
      <ChevronLeft class="w-4 h-4" /> Back to Home
    </router-link>

    <div class="w-full max-w-md bg-white rounded-[48px] shadow-2xl p-10 border-b-8 border-slate-200">
      <div class="flex flex-col items-center text-center mb-8">
        <div class="bg-cyan-400 p-4 rounded-[24px] shadow-lg mb-4 animate-bounce-slow">
          <ShieldPlus class="w-10 h-10 text-indigo-600" />
        </div>
        <h2 class="text-3xl font-black text-indigo-600 uppercase tracking-tight">Join ProtectEd</h2>
        <p class="text-slate-400 text-sm font-bold mt-1">Start your gamified learning journey</p>
        
        <transition name="fade">
          <p v-if="error" class="text-red-600 text-xs font-bold mt-4 bg-red-50 p-3 rounded-xl w-full border border-red-100">
            {{ error }}
          </p>
        </transition>
      </div>

      <div class="space-y-4">
        <div class="relative">
          <User class="absolute left-5 top-4.5 w-4 h-4 text-slate-400" />
          <input v-model="username" type="text" placeholder="Full Name" 
            class="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 outline-none transition-all" />
        </div>

        <div class="relative">
          <Mail class="absolute left-5 top-4.5 w-4 h-4 text-slate-400" />
          <input v-model="email" type="email" placeholder="Email Address" 
            class="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 outline-none transition-all" />
        </div>

        <div class="relative">
          <Lock class="absolute left-5 top-4.5 w-4 h-4 text-slate-400" />
          <input v-model="password" type="password" placeholder="Password" 
            class="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 outline-none transition-all" />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2">Select Your Role</label>
          <div class="flex bg-slate-100 p-1.5 rounded-2xl">
            <button @click="role = 'learner'" 
              :class="role === 'learner' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'" 
              class="flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all">Learner</button>
            <button @click="role = 'facilitator'" 
              :class="role === 'facilitator' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'" 
              class="flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all">Facilitator</button>
          </div>
        </div>

        <button @click="handleRegister" :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center space-x-3 shadow-lg transition-all disabled:opacity-50">
          <span v-if="!loading">Sign Up</span>
          <span v-else>Processing...</span>
          <ArrowRight v-if="!loading" class="w-4 h-4" />
        </button>

        <p class="text-center text-[10px] font-bold text-slate-400 uppercase pt-2">
          Already have an account? <router-link to="/login" class="text-indigo-600">Sign In</router-link>
        </p>
      </div>
    </div>

    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 bg-indigo-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
        <div class="bg-white rounded-[48px] p-12 max-w-sm w-full text-center shadow-2xl">
          <div class="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle class="w-16 h-16 text-emerald-500" />
          </div>
          <h3 class="text-2xl font-black text-slate-800 uppercase tracking-tighter">Check Email!</h3>
          <p class="text-slate-500 font-bold text-sm mt-4 mb-8 leading-relaxed">
            We've sent a verification link to <br/><span class="text-indigo-600">{{ email }}</span>
          </p>
          <button @click="router.push('/login')" 
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase text-xs shadow-lg transition-colors">
            Back to Login
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.animate-bounce-slow { animation: bounce 3s infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(-5%); } 50% { transform: translateY(0); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.pop-enter-active { animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style>