<template>
  <div class="p-8 bg-white border-4 border-black rounded-[40px] max-w-2xl mx-auto shadow-[12px_12px_0_0_black]">
    <div v-if="!result" class="space-y-8">
      <div class="h-6 w-full bg-slate-100 border-4 border-black rounded-full overflow-hidden">
        <div class="bg-brand-yellow h-full transition-all" :style="{width: progress + '%'}"></div>
      </div>

      <h2 class="text-3xl font-black italic">"{{ currentScenario.context }}"</h2>
      
      <div class="grid gap-4">
        <button v-for="choice in currentScenario.choices" :key="choice.text"
          @click="selectChoice(choice)"
          class="p-6 text-left border-4 border-black rounded-2xl font-bold bg-white hover:bg-brand-purple hover:-translate-y-1 hover:shadow-[8px_8px_0_0_black] transition-all active:translate-y-0">
          {{ choice.text }}
        </button>
      </div>
    </div>

    <div v-else class="text-center py-10">
      <h3 class="text-4xl font-black uppercase mb-4">AI Analysis</h3>
      <div class="p-6 border-4 border-black rounded-3xl bg-brand-cyan shadow-[8px_8px_0_0_black]">
        <p class="font-black text-2xl">{{ result.prediction }}</p>
        <p class="text-xs mt-2 uppercase">Confidence: {{ (result.confidence * 100).toFixed(0) }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import confetti from 'canvas-confetti';
import api from '../services/api';

const props = defineProps(['quizData']);
const step = ref(0);
const selected = ref([]);
const result = ref(null);

const currentScenario = computed(() => props.quizData.scenarios[step.value]);
const progress = computed(() => ((step.value + 1) / props.quizData.scenarios.length) * 100);

const selectChoice = async (choice) => {
  selected.value.push(choice);
  if (step.value < props.quizData.scenarios.length - 1) {
    step.value++;
  } else {
    const res = await api.post('/quiz/analyze-behavior', { selectedChoices: selected.value });
    result.value = res.data;
    confetti();
  }
};
</script>