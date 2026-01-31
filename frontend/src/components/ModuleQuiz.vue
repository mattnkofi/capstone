<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const props = defineProps(['moduleId'])
const emit = defineEmits(['completed'])

const questions = ref([])
const currentIndex = ref(0)
const score = ref(0)
const showResult = ref(false)

const loadQuiz = async () => {
  const res = await api.getModuleQuiz(props.moduleId)
  questions.value = res.data
}

const handleAnswer = (choice) => {
  if (choice === questions.value[currentIndex.value].correct_answer) {
    score.value += questions.value[currentIndex.value].points
  }
  
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  } else {
    showResult.value = true
    emit('completed', score.value)
  }
}

onMounted(loadQuiz)
</script>

<template>
  <div class="pop-3d p-8 bg-white rounded-[40px] max-w-2xl mx-auto">
    <div v-if="!showResult && questions.length > 0">
      <div class="flex justify-between mb-6">
        <span class="text-[10px] font-black uppercase tracking-widest text-brand-purple">
          Question {{ currentIndex + 1 }}/{{ questions.length }}
        </span>
        <span class="text-[10px] font-black uppercase text-brand-pink">Points: {{ score }}</span>
      </div>

      <h3 class="text-xl font-black mb-8 italic">{{ questions[currentIndex].question }}</h3>

      <div class="grid grid-cols-1 gap-4">
        <button v-for="opt in ['a', 'b', 'c', 'd']" :key="opt"
          @click="handleAnswer(opt.toUpperCase())"
          class="w-full p-4 border-4 border-black rounded-2xl font-bold text-left hover:bg-brand-cyan hover:-translate-y-1 active:translate-y-1 transition-all">
          {{ questions[currentIndex]['option_' + opt] }}
        </button>
      </div>
    </div>

    <div v-else-if="showResult" class="text-center py-10">
      <h2 class="text-4xl font-black mb-4 italic">MODULE COMPLETE!</h2>
      <p class="text-lg font-bold mb-8">You earned {{ score }} points</p>
      <button @click="$emit('close')" class="pop-3d px-10 py-4 bg-brand-purple text-white rounded-2xl font-black uppercase">
        Continue Path
      </button>
    </div>
  </div>
</template>