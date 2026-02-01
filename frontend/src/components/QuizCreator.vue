<template>
  <div class="p-8 bg-white border-4 border-black rounded-[40px] shadow-[8px_8px_0_0_black] max-w-4xl mx-auto">
    <h2 class="text-3xl font-black uppercase mb-6 flex items-center gap-3">
      <BrainCircuit class="w-10 h-10 text-brand-purple" />
      Game Designer
    </h2>

    <div v-for="(scenario, sIdx) in scenarios" :key="sIdx" class="mb-8 p-6 bg-slate-50 border-4 border-black rounded-3xl relative">
      <button @click="removeScenario(sIdx)" class="absolute top-4 right-4 text-red-500 hover:scale-110">
        <Trash2 class="w-6 h-6" />
      </button>

      <label class="block font-black text-xs uppercase mb-2 text-slate-400">Situation Context</label>
      <textarea v-model="scenario.context" class="w-full p-4 border-2 border-black rounded-xl font-bold mb-4" placeholder="Describe the situation..."></textarea>

      <label class="block font-black text-xs uppercase mb-2 text-slate-400">Statement Choices (AI Categorization)</label>
      <div v-for="(choice, cIdx) in scenario.choices" :key="cIdx" class="flex gap-4 mb-3 items-center">
        <input v-model="choice.text" placeholder="The statement user picks..." class="flex-1 p-2 border-2 border-black rounded-lg text-sm" />
        
        <select v-model="choice.behavior" class="p-2 border-2 border-black rounded-lg font-black text-[10px] uppercase bg-white">
          <option value="Neutral">Neutral</option>
          <option value="Victim">Victim Pattern</option>
          <option value="Suspect">Suspect Pattern</option>
        </select>

        <input type="number" v-model="choice.weight" step="0.1" class="w-16 p-2 border-2 border-black rounded-lg text-xs" title="AI Weight" />
      </div>
      <button @click="addChoice(sIdx)" class="text-[10px] font-black uppercase text-brand-purple hover:underline">+ Add Choice Statement</button>
    </div>

    <div class="flex gap-4">
      <button @click="addScenario" class="flex-1 bg-slate-200 p-4 border-4 border-black rounded-2xl font-black uppercase shadow-[4px_4px_0_0_black]">Add New Situation</button>
      <button @click="publishGame" class="flex-1 bg-brand-cyan p-4 border-4 border-black rounded-2xl font-black uppercase shadow-[4px_4px_0_0_black] hover:translate-y-1 hover:shadow-none transition-all">Publish Game Module</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BrainCircuit, Trash2 } from 'lucide-vue-next'
import api from '../services/api'

const scenarios = ref([
  { context: '', choices: [{ text: '', behavior: 'Neutral', weight: 1.0 }] }
])

const addScenario = () => scenarios.value.push({ context: '', choices: [{ text: '', behavior: 'Neutral', weight: 1.0 }] })
const addChoice = (idx) => scenarios.value[idx].choices.push({ text: '', behavior: 'Neutral', weight: 1.0 })
const removeScenario = (idx) => scenarios.value.splice(idx, 1)

const publishGame = async () => {
  try {
    await api.post('/quiz/create', { scenarios: scenarios.value })
    alert("Game Published Successfully!")
  } catch (err) {
    console.error(err)
  }
}
</script>