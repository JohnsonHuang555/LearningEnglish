<template>
  <div class="quiz-detail">
    <vocabulary-cmp
      v-for="vocabulary in quizResult"
      :key="vocabulary.id"
      :class="{ 'incorrect-question':!vocabulary.isCorrect, 'correct-question': vocabulary.isCorrect}"
      :vocabulary="vocabulary"/>
  </div>
</template>

<script>
import VocabularyCmp from '@/components/VocabularyCmp.vue'

export default {
  name: 'quiz-detail',
  components: {
    VocabularyCmp
  },
  props: {
    quizResult: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>

.incorrect-question {
  background: #ffb8b8;
}

.correct-question {
  background: #fff;
}
</style>
