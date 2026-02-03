<script setup>
import { User, Mail, Lock, CheckCircle, ShieldPlus, ArrowRight, ChevronLeft } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const success = ref(false)

const handleRegister = () => {
  // Logic for registration success
  success.value = true
  
  // Wait for 1.5 seconds so the user can see the message, then redirect
  setTimeout(() => {
    router.push('/login')
  }, 1500)
}
</script>

<template>
  <div class="auth-page">
    <div class="gradient-bg"></div>

    <div class="bubbles-container">
      <div v-for="n in 12" :key="n" class="bubble"></div>
    </div>

    <div class="circle pink-glow"></div>
    <div class="circle blue-glow"></div>

    <router-link to="/" class="back-link">
      <ChevronLeft class="w-4 h-4" /> Back to Home
    </router-link>

    <div class="auth-card" :class="{ 'blur-sm': success }">
      <div class="card-header">
        <div class="logo-box-pink">
          <ShieldPlus class="logo-icon" />
        </div>
        <h2>Sign Up</h2>
        <p>Join the game and start your journey.</p>
      </div>

      <div class="form-body">
        <div class="input-group">
          <label>Full Name</label>
          <div class="input-wrapper">
            <User class="field-icon" />
            <input v-model="name" type="text" placeholder="Enter your full name" />
          </div>
        </div>

        <div class="input-group">
          <label>Email Address</label>
          <div class="input-wrapper">
            <Mail class="field-icon" />
            <input v-model="email" type="email" placeholder="name@email.com" />
          </div>
        </div>
        
        <div class="input-group">
          <label>Password</label>
          <div class="input-wrapper">
            <Lock class="field-icon" />
            <input v-model="password" type="password" placeholder="••••••••" />
          </div>
        </div>

        <button @click="handleRegister" class="btn-auth-pink pulse-hover-pink">
          <span>Join Now</span>
          <ArrowRight class="w-5 h-5" />
        </button>
      </div>

      <div class="card-footer">
        <p>Already have an account? <router-link to="/login">Sign In</router-link></p>
      </div>
    </div>

    <transition name="pop">
      <div v-if="success" class="success-modal">
        <div class="success-box">
          <div class="check-ring-pink">
            <CheckCircle class="check-icon pulse-glow" />
          </div>
          <h3>Ready to Play!</h3>
          <p>Redirecting to login...</p>
        </div>
      </div>
    </transition>
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
  background: #020617;
}

/* --- Moving Gradient Background --- */
.gradient-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #170216, #4c0519, #831843, #020617);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
  z-index: 0;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* --- Floating Bubbles --- */
.bubbles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.bubble {
  position: absolute;
  bottom: -100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: float-up 12s infinite ease-in;
}

.bubble:nth-child(even) { background: rgba(236, 72, 153, 0.1); }
.bubble:nth-child(1) { width: 40px; height: 40px; left: 15%; animation-duration: 10s; }
.bubble:nth-child(2) { width: 25px; height: 25px; left: 40%; animation-duration: 14s; animation-delay: 2s; }
.bubble:nth-child(3) { width: 55px; height: 55px; left: 60%; animation-duration: 18s; }
.bubble:nth-child(4) { width: 35px; height: 35px; left: 80%; animation-duration: 12s; animation-delay: 4s; }

@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 0.4; }
  100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
}

/* --- Decorative Glow Circles --- */
.circle { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.15; z-index: 1; animation: move 10s infinite alternate; }
.pink-glow { width: 400px; height: 400px; background: #ec4899; top: -50px; right: -50px; }
.blue-glow { width: 300px; height: 300px; background: #3b82f6; bottom: -50px; left: -50px; }

@keyframes move { from { transform: translate(0,0); } to { transform: translate(-30px, 30px); } }

/* --- UI Card --- */
.auth-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  text-align: center;
}

.back-link {
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  z-index: 20;
}

.logo-box-pink {
  width: 64px;
  height: 64px;
  background: #ec4899;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 10px 20px -5px rgba(236, 72, 153, 0.5);
}
.logo-icon { color: white; width: 32px; height: 32px; }

h2 { font-size: 28px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }
.card-header p { color: #b894af; font-size: 14px; margin-bottom: 30px; }

/* --- Inputs --- */
.input-group { margin-bottom: 20px; text-align: left; }
.input-group label { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px; margin-left: 4px; }
.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #020617;
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: 0.3s;
}
.input-wrapper:focus-within { border-color: #ec4899; box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.1); }
.field-icon { width: 18px; color: #475569; }
input { background: none; border: none; color: white; width: 100%; outline: none; font-size: 15px; }

/* --- Button --- */
.btn-auth-pink {
  width: 100%;
  padding: 16px;
  background: #ec4899;
  border: none;
  border-radius: 16px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}
.btn-auth-pink:hover { background: #db2777; transform: translateY(-2px); }

.pulse-hover-pink:hover {
  animation: pulse-pink 1.5s infinite;
}

@keyframes pulse-pink {
  0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(236, 72, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
}

.card-footer { margin-top: 24px; text-align: center; font-size: 14px; color: #64748b; }
.card-footer a { color: #ec4899; text-decoration: none; font-weight: 600; }

/* --- Success Message --- */
.success-modal {
  position: absolute;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 6, 23, 0.4);
  backdrop-filter: blur(4px);
}
.success-box {
  background: #0f172a;
  padding: 48px;
  border-radius: 32px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.check-ring-pink {
  width: 80px;
  height: 80px;
  background: rgba(236, 72, 153, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  border: 2px solid #ec4899;
}
.check-icon { color: #ec4899; width: 40px; height: 40px; }
.success-box h3 { font-size: 24px; font-weight: 800; margin-bottom: 8px; }

.pulse-glow { animation: glow 2s infinite; }
@keyframes glow {
  0% { filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.4)); }
  50% { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.8)); }
  100% { filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.4)); }
}

.pop-enter-active { animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop-in { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style>