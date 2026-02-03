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
  <div class="auth-page">
    <div class="gradient-bg"></div>

    <div class="bubbles-container">
      <div v-for="n in 12" :key="n" class="bubble"></div>
    </div>

    <div class="auth-card">
      <div class="card-header">
        <div class="icon-box">
          <ShieldCheck class="w-10 h-10 text-white" />
        </div>
        <h2>Welcome Back</h2>
        <p>Sign in to your ProtectEd account</p>
        <transition name="fade">
          <p v-if="error" class="error-msg">{{ error }}</p>
        </transition>
      </div>

      <div class="form-body">
        <div class="input-group">
          <Mail class="field-icon" />
          <input v-model="email" type="email" placeholder="Email Address" />
        </div>
        
        <div class="input-group">
          <Lock class="field-icon" />
          <input v-model="password" type="password" placeholder="Password" />
        </div>

        <button @click="handleLogin" class="submit-btn pulse-hover">
          <span>Enter Portal</span>
          <ArrowRight class="w-5 h-5" />
        </button>

        <p class="footer-text">
          New here? <router-link to="/register">Create an account</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* --- Moving Gradient Background --- */
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

/* --- Floating Bubbles --- */
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

.bubble:nth-child(even) { background: rgba(59, 130, 246, 0.1); }
.bubble:nth-child(1) { width: 40px; height: 40px; left: 10%; animation-duration: 10s; }
.bubble:nth-child(2) { width: 20px; height: 20px; left: 25%; animation-duration: 14s; animation-delay: 2s; }
.bubble:nth-child(3) { width: 60px; height: 60px; left: 45%; animation-duration: 18s; }
.bubble:nth-child(4) { width: 30px; height: 30px; left: 75%; animation-duration: 12s; animation-delay: 4s; }

@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 0.4; }
  100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
}

/* --- UI Elements --- */
.auth-card {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  padding: 50px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
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
.card-header p { color: #94a3b8; font-size: 14px; margin-bottom: 30px; }

.error-msg { color: #ef4444; font-size: 12px; font-weight: 700; margin-top: 15px; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 12px; }

.input-group {
  background: #020617;
  border-radius: 15px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  transition: 0.3s;
}

.input-group:focus-within { border-color: #3b82f6; }
.field-icon { color: #475569; width: 20px; }
input { background: none; border: none; color: white; width: 100%; outline: none; font-size: 14px; }

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

.pulse-hover:hover { animation: pulse-shadow 1.5s infinite; }
@keyframes pulse-shadow {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}

.footer-text { margin-top: 25px; font-size: 13px; color: #64748b; }
.footer-text a { color: #3b82f6; font-weight: 700; text-decoration: none; }
</style>