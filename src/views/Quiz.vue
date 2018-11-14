<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs6 class="page-title">Quiz</v-flex>
      <v-flex xs6 class="time-area" align-center justify-end>
        <h2 class="mr-5">1 / 10</h2>
        <v-icon medium class="mr-2">alarm</v-icon>
        <h2>09:59</h2>
      </v-flex>
    </v-layout>
    <v-layout class="question-layout">
      <v-flex d-flex justify-center align-center>        
        <quiz-prepare />
        <quizzing v-if="false"/>
        <quiz-result v-if="false"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuizPrepare from '@/components/QuizPrepare.vue'
import Quizzing from '@/components/Quizzing.vue'
import QuizResult from '@/components/QuizResult.vue'

export default {
  name: 'quiz',
  components: {
    QuizPrepare,
    Quizzing,
    QuizResult
  },
  data() {
    return {
      time: 600000, // second 10 minutes
    }
  }
}
</script>

<style lang="scss" scoped>

$content: #949494;

.time-area {
  display: flex;
  h2 {
    font-weight: 500;
  }
}

.question-layout {
  height: 75vh;
}

.question-content {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .question-title {
    font-size: 24px;
  }
  h1 {
    font-weight: 500;
  }
}
</style>
