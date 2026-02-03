<script setup>
import { Play, Trophy } from 'lucide-vue-next'
</script>

<template>
  <div class="landing-wrapper">
    <div class="gradient-bg"></div>

    <div class="bubbles-container">
      <div v-for="n in 12" :key="n" class="bubble"></div>
    </div>

    <div class="background-container">
      <div class="circle blue"></div>
      <div class="circle pink"></div>
      <div class="circle blue-small"></div>
    </div>

    <div class="content">
      <div class="top-badge">
        <Trophy class="icon-small" />
        <span>NEW LESSONS READY</span>
      </div>

      <h1 class="main-title">Learn. Play. Stay Safe.</h1>
      
      <p class="description">
        Join our school game at MSU! Learn how to stay safe, 
        finish fun quests, and earn badges while helping your classmates.
      </p>

      <div class="button-group">
        <router-link to="/login" class="btn-start">
          <Play class="icon-btn" /> Start the Game
        </router-link>
        <router-link to="/register" class="btn-account">
          Make an Account
        </router-link>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <div class="card-icon">🏆</div>
          <h3>Win Prizes</h3>
          <p>Get badges for finishing lessons.</p>
        </div>
        <div class="info-card">
          <div class="card-icon">📖</div>
          <h3>Easy Lessons</h3>
          <p>Follow a simple path to learn.</p>
        </div>
        <div class="info-card">
          <div class="card-icon">👥</div>
          <h3>Help Friends</h3>
          <p>Work together to stay safe.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- NEW STYLES: MOVING GRADIENT --- */
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

/* --- NEW STYLES: FLOATING BUBBLES --- */
.bubbles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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

/* Custom sizes and positions for bubbles */
.bubble:nth-child(1) { width: 40px; height: 40px; left: 10%; animation-duration: 10s; }
.bubble:nth-child(2) { width: 20px; height: 20px; left: 25%; animation-duration: 14s; animation-delay: 2s; }
.bubble:nth-child(3) { width: 60px; height: 60px; left: 40%; animation-duration: 18s; }
.bubble:nth-child(4) { width: 30px; height: 30px; left: 55%; animation-duration: 12s; animation-delay: 5s; }
.bubble:nth-child(5) { width: 50px; height: 50px; left: 70%; animation-duration: 15s; }
.bubble:nth-child(6) { width: 25px; height: 25px; left: 85%; animation-duration: 13s; animation-delay: 3s; }
.bubble:nth-child(7) { width: 45px; height: 45px; left: 15%; animation-duration: 16s; animation-delay: 7s; }
.bubble:nth-child(8) { width: 35px; height: 35px; left: 35%; animation-duration: 11s; }
.bubble:nth-child(9) { width: 55px; height: 55px; left: 60%; animation-duration: 20s; animation-delay: 1s; }
.bubble:nth-child(10) { width: 20px; height: 20px; left: 80%; animation-duration: 14s; }
.bubble:nth-child(11) { width: 40px; height: 40px; left: 50%; animation-duration: 12s; animation-delay: 4s; }
.bubble:nth-child(12) { width: 25px; height: 25px; left: 95%; animation-duration: 17s; }

@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 0.4; }
  100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
}

/* --- ORIGINAL STYLES REMAINING UNCHANGED --- */
.landing-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.background-container {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.2;
  animation: move 15s infinite alternate ease-in-out;
}

.blue { width: 600px; height: 600px; background: #3b82f6; top: -100px; left: -100px; }
.pink { width: 500px; height: 500px; background: #ec4899; bottom: -50px; right: -50px; animation-delay: -5s; }
.blue-small { width: 300px; height: 300px; background: #60a5fa; top: 40%; left: 30%; animation-duration: 20s; }

@keyframes move {
  from { transform: translate(0, 0); }
  to { transform: translate(80px, 80px); }
}

.content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  text-align: center;
  padding: 20px;
}

.top-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 30px;
}

.main-title {
  font-size: 70px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  color: #94a3b8;
  margin-bottom: 40px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 80px;
}

.btn-start {
  background: #3b82f6;
  padding: 15px 40px;
  border-radius: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s;
  color: white;
  text-decoration: none;
}

.btn-start:hover { background: #2563eb; transform: translateY(-3px); }

.btn-account {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 40px;
  border-radius: 15px;
  font-weight: 700;
  transition: 0.3s;
  color: white;
  text-decoration: none;
}

.btn-account:hover { background: rgba(255, 255, 255, 0.1); }

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.info-card {
  background: rgba(15, 23, 42, 0.6);
  padding: 30px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: 0.3s;
}

.info-card:hover { border-color: #3b82f6; }

.card-icon { font-size: 30px; margin-bottom: 15px; }
.info-card h3 { font-weight: 700; margin-bottom: 10px; }
.info-card p { font-size: 13px; color: #64748b; }
</style>