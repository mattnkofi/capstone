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
  <div class="auth-page">
    <div class="gradient-bg"></div>

    <div class="bubbles-container">
      <div v-for="n in 12" :key="n" class="bubble"></div>
    </div>

    <router-link to="/" class="back-link">
      <ChevronLeft class="w-4 h-4" /> Back to Home
    </router-link>

    <div class="auth-card">
      <div class="card-header">
        <div class="icon-box">
          <ShieldPlus class="w-10 h-10 text-white" />
        </div>
        <h2>Join ProtectEd</h2>
        <p>Start your gamified learning journey</p>
        
        <transition name="fade">
          <p v-if="error" class="error-msg">{{ error }}</p>
        </transition>
      </div>

      <div class="form-body">
        <div class="input-group">
          <User class="field-icon" />
          <input v-model="username" type="text" placeholder="Full Name" />
        </div>

        <div class="input-group">
          <Mail class="field-icon" />
          <input v-model="email" type="email" placeholder="Email Address" />
        </div>

        <div class="input-group">
          <Lock class="field-icon" />
          <input v-model="password" type="password" placeholder="Password" />
        </div>

        <div class="role-selector-container">
          <label class="role-label">Select Your Role</label>
          <div class="role-toggle">
            <button @click="role = 'learner'" 
              :class="role === 'learner' ? 'active' : ''">Learner</button>
            <button @click="role = 'facilitator'" 
              :class="role === 'facilitator' ? 'active' : ''">Facilitator</button>
          </div>
        </div>

        <button @click="handleRegister" class="submit-btn pulse-hover" :disabled="loading">
          <span v-if="!loading">Create Account</span>
          <span v-else>Processing...</span>
          <ArrowRight v-if="!loading" class="w-5 h-5" />
        </button>

        <p class="footer-text">
          Already have an account? <router-link to="/login">Login In</router-link>
        </p>
      </div>
    </div>

    <transition name="pop">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-icon-box">
            <CheckCircle class="w-16 h-16 text-emerald-500" />
          </div>
          <h3>Check Email!</h3>
          <p>We've sent a verification link to <br/><span>{{ email }}</span></p>
          <button @click="router.push('/login')" class="submit-btn">
            Back to Login
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Inherited styles from your LoginView reference */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  color: white;
}

.gradient-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #020617, #0f172a, #1e1b4b, #312e81);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
  z-index: -2;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bubbles-container {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.bubble {
  position: absolute;
  bottom: -100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: float-up 12s infinite ease-in;
}

@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 0.4; }
  100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
}

.auth-card {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.icon-box {
  background: #3b82f6;
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

h2 { font-size: 32px; font-weight: 800; margin-bottom: 8px; }
.card-header p { color: #94a3b8; font-size: 14px; margin-bottom: 25px; }

.error-msg { 
  color: #ef4444; 
  font-size: 12px; 
  font-weight: 700; 
  margin-top: 15px; 
  background: rgba(239, 68, 68, 0.1); 
  padding: 10px; 
  border-radius: 12px; 
}

.input-group {
  background: #020617;
  border-radius: 15px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  border: 1px solid transparent;
  transition: 0.3s;
}

.input-group:focus-within { border-color: #3b82f6; }
.field-icon { color: #475569; width: 20px; }
input { background: none; border: none; color: white; width: 100%; outline: none; font-size: 14px; }

/* Role Selector specific styling */
.role-selector-container { margin-bottom: 20px; text-align: left; }
.role-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #475569; margin-left: 10px; display: block; margin-bottom: 8px; }
.role-toggle { background: #020617; padding: 6px; border-radius: 15px; display: flex; gap: 5px; }
.role-toggle button { flex: 1; padding: 10px; border-radius: 10px; border: none; background: transparent; color: #475569; font-weight: 800; font-size: 11px; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
.role-toggle button.active { background: rgba(255, 255, 255, 0.05); color: #3b82f6; }

.submit-btn {
  background: #3b82f6;
  width: 100%;
  padding: 15px;
  border-radius: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover { background: #2563eb; transform: translateY(-2px); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.footer-text { margin-top: 25px; font-size: 13px; color: #64748b; }
.footer-text a { color: #3b82f6; font-weight: 700; text-decoration: none; }

.back-link { 
  position: absolute; 
  top: 40px; 
  left: 40px; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  color: #64748b; 
  font-weight: 800; 
  text-transform: uppercase; 
  font-size: 10px; 
  text-decoration: none; 
  z-index: 20;
}

/* Modal styles matching glassmorphism */
.modal-overlay {
  fixed: inset 0;
  background: rgba(2, 6, 23, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal-card {
  background: #0f172a;
  padding: 40px;
  border-radius: 40px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.modal-icon-box { margin-bottom: 20px; }
.modal-card h3 { font-size: 24px; font-weight: 800; margin-bottom: 10px; }
.modal-card p { font-size: 14px; color: #94a3b8; margin-bottom: 30px; }
.modal-card span { color: #3b82f6; font-weight: 700; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>