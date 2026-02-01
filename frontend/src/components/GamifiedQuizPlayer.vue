<script setup>
import { ref, computed } from 'vue'
import { Timer, Zap, ShieldAlert, Trophy } from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import api from '../services/api'

const props = defineProps(['quizData'])
const step = ref(0)
const score = ref(0)
const points = ref(0)
const result = ref(null)

const current = computed(() => props.quizData.scenarios[step.value])
const modeClass = computed(() => {
  if (props.quizData.game_type === 'Survival') return 'bg-red-50 border-red-500'
  if (props.quizData.game_type === 'Speed Blitz') return 'bg-cyan-50 border-brand-cyan'
  return 'bg-slate-50 border-black'
})

const selectChoice = async (choice) => {
  // Gamified Scoring: Speed Blitz gives double points for time, Logic gives static points
  const basePoints = 100
  points.value += props.quizData.game_type === 'Speed Blitz' ? basePoints * 1.5 : basePoints

  if (step.value < props.quizData.scenarios.length - 1) {
    step.value++
  } else {
    // LOG EVERYTHING IN DATABASE
    const res = await api.post('/quiz/log-gameplay', {
      gameId: props.quizData.gameId,
      points: points.value,
      choices: props.quizData.scenarios // Passed for AI Analysis
    })
    result.value = res.data
    confetti()
  }
}
</script>

<template>
  <div :class="[modeClass, 'p-8 border-8 rounded-[50px] max-w-2xl mx-auto shadow-[15px_15px_0_0_black] transition-colors']">
    <div v-if="!result">
      <div class="flex justify-between items-center mb-6">
        <span class="bg-black text-white px-4 py-1 rounded-full font-black text-[10px] uppercase">
          {{ props.quizData.game_type }} Mode
        </span>
        <div class="flex items-center gap-2 font-black italic">
          <Zap class="w-5 h-5 text-brand-yellow fill-brand-yellow" />
          {{ points }} PTS
        </div>
      </div>

      <h2 class="text-3xl font-black mb-8 leading-tight italic">"{{ current.context }}"</h2>
      <div class="grid gap-4">
        <button v-for="c in current.choices" :key="c.text" @click="selectChoice(c)"
          class="p-6 text-left border-4 border-black rounded-3xl font-bold bg-white hover:bg-brand-yellow hover:-translate-y-2 transition-all active:translate-y-0">
          {{ c.text }}
        </button>
      </div>
    </div>

    <div v-else class="text-center py-10">
      <Trophy class="w-20 h-20 mx-auto mb-6 text-brand-yellow drop-shadow-md" />
      <h2 class="text-4xl font-black uppercase mb-2 italic">Victory!</h2>
      <p class="font-bold text-xl mb-4">You earned {{ points }} points</p>
      <div class="p-4 bg-white border-4 border-black rounded-3xl mb-6">
        <p class="text-[10px] font-black text-slate-400 uppercase">AI Pattern Analysis</p>
        <p class="font-black text-brand-purple text-xl">{{ result.prediction }}</p>
      </div>
      <button @click="$router.push('/dashboard')" class="bg-brand-cyan px-8 py-4 border-4 border-black rounded-2xl font-black uppercase shadow-[6px_6px_0_0_black]">Back to Map</button>
    </div>
  </div>
</template>