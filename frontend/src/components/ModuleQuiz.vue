<script setup>
import { ref, computed } from 'vue'
import { Brain, Zap, ShieldAlert, UserSearch } from 'lucide-vue-next'
import api from '../services/api'

const situations = ref([
  {
    id: 1,
    context: "You are talking to a friend who seems distant. Which statement do you choose to say?",
    choices: [
      { text: "It's probably your fault they are angry.", type: "Suspect" },
      { text: "I'm worried about you; is everything okay at home?", type: "Neutral" },
      { text: "I should just keep quiet to avoid making it worse.", type: "Victim" }
    ]
  }
])

const selectedPath = ref([])
const currentIndex = ref(0)
const aiAnalyzing = ref(false)
const finalReport = ref(null)

const makeChoice = async (choice) => {
  selectedPath.value.push(choice.text)
  
  if (currentIndex.value < situations.value.length - 1) {
    currentIndex.value++
  } else {
    // TRIGGER AI PREDICTION
    aiAnalyzing.value = true
    try {
      const res = await api.analyzeBehavior({
        userId: 1, 
        moduleId: 101, 
        selectedStatements: selectedPath.value 
      })
      finalReport.value = res.data
    } finally {
      aiAnalyzing.value = false
    }
  }
}
</script>

<template>
  <div class="pop-3d p-8 bg-white rounded-[40px] border-4 border-black max-w-2xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl">
        <Brain class="w-5 h-5 text-brand-cyan" />
        <span class="font-black text-[10px] uppercase">AI Predictive Engine Active</span>
      </div>
      <div v-if="aiAnalyzing" class="animate-pulse text-brand-purple font-black uppercase text-xs">
        Analyzing Patterns...
      </div>
    </div>

    <div v-if="!finalReport">
      <h2 class="text-xl font-black mb-6 italic text-slate-600">
        "{{ situations[currentIndex].context }}"
      </h2>

      <div class="space-y-4">
        <button v-for="choice in situations[currentIndex].choices" :key="choice.text"
          @click="makeChoice(choice)"
          class="w-full p-6 text-left border-4 border-black rounded-2xl font-bold bg-slate-50 hover:bg-brand-yellow hover:-translate-y-1 transition-all shadow-[4px_4px_0_0_black] active:shadow-none">
          {{ choice.text }}
        </button>
      </div>
    </div>

    <div v-else class="text-center bg-slate-50 p-8 border-4 border-black rounded-3xl">
      <ShieldAlert v-if="finalReport.prediction === 'At-Risk Victim'" class="w-16 h-16 mx-auto text-red-500 mb-4" />
      <UserSearch v-else class="w-16 h-16 mx-auto text-brand-purple mb-4" />
      
      <h3 class="text-2xl font-black uppercase">AI Analysis Result</h3>
      <p class="text-lg font-bold mt-2">Predicted Role: <span class="text-brand-purple">{{ finalReport.prediction }}</span></p>
      <div class="mt-4 p-4 bg-white border-2 border-black rounded-xl">
        <p class="text-[10px] font-bold text-slate-400 uppercase">Confidence Score</p>
        <div class="w-full bg-slate-200 h-2 rounded-full mt-1">
          <div class="bg-brand-cyan h-full" :style="{ width: (finalReport.confidence * 100) + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>