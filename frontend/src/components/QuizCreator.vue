<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BrainCircuit, Timer, ShieldAlert, Trophy, Trash2 } from 'lucide-vue-next';
import api from '../services/api';

const route = useRoute();
const router = useRouter();

const gameType = ref('Speed Blitz');
const scenarios = ref([{ context: '', choices: [{ text: '', behavior: 'Neutral', is_correct: false }] }]);

const gameModes = [
  { id: 'Speed Blitz', desc: 'Fast-paced: Higher points for quick answers', icon: Timer, color: 'bg-brand-cyan' },
  { id: 'Logic Puzzle', desc: 'Requires careful analysis', icon: BrainCircuit, color: 'bg-brand-purple' },
  { id: 'Survival', desc: 'High Stakes gameplay', icon: ShieldAlert, color: 'bg-[#FF007F]' }
];

const submitQuiz = async () => {
  try {
    // FIX: Use named method instead of api.post
    await api.saveGamifiedQuiz({ 
      resourceId: route.params.resourceId, 
      gameType: gameType.value,
      scenarios: scenarios.value 
    });
    router.push('/dashboard');
  } catch (err) {
    console.error("Save failed", err);
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white border-4 border-black rounded-[40px] p-8 shadow-[12px_12px_0_0_black] mt-10">
    <h1 class="text-3xl font-black uppercase mb-8 flex items-center gap-3">
      <Trophy class="w-10 h-10 text-yellow-400" /> Game Mode Designer
    </h1>

    <div class="mb-10">
      <p class="font-black text-xs uppercase mb-4 text-slate-400">Step 1: Choose Game Interface</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button v-for="mode in gameModes" :key="mode.id"
          @click="gameType = mode.id"
          :class="['p-4 border-4 border-black rounded-3xl text-left transition-all', 
            gameType === mode.id ? mode.color + ' -translate-y-1 shadow-[4px_4px_0_0_black]' : 'bg-white']">
          <component :is="mode.icon" class="w-8 h-8 mb-2" />
          <p class="font-black uppercase text-xs">{{ mode.id }}</p>
        </button>
      </div>
    </div>

    <div v-for="(s, sIdx) in scenarios" :key="sIdx" class="mb-10 p-6 border-4 border-black rounded-3xl bg-white">
      <textarea v-model="s.context" placeholder="Situation context..." class="w-full p-4 border-2 border-black rounded-xl font-bold mb-4"></textarea>
      <div v-for="(c, cIdx) in s.choices" :key="cIdx" class="flex gap-4 mb-3">
        <input v-model="c.text" placeholder="Choice statement" class="flex-1 p-2 border-2 border-black rounded-lg" />
        <select v-model="c.behavior" class="p-2 border-2 border-black rounded-lg font-black text-[10px] uppercase">
          <option value="Neutral">Neutral</option>
          <option value="Victim Pattern">Victim</option>
          <option value="Suspect Pattern">Suspect</option>
        </select>
      </div>
      <button @click="s.choices.push({ text: '', behavior: 'Neutral' })" class="text-[10px] font-black uppercase underline">+ Add choice</button>
    </div>

    <button @click="submitQuiz" class="w-full bg-black text-white p-5 border-4 border-black rounded-2xl font-black uppercase shadow-[6px_6px_0_0_#00D4FF]">
      Finalize Game
    </button>
  </div>
</template>