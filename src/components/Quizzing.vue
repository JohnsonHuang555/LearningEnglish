<template>
  <div class="question-content">    
    <div v-if="!isShowSubmit" class="question-content">
      <div class="question-title mb-4">Question</div>
      <h1 class="mb-4">
      <span
        v-for="question in quizQuestions[questionNumber - 1].questions"
        :key="question.id">
        {{ question }}
      </span>
      </h1>
      <v-text-field
        class="mb-5"
        label="Solo"
        placeholder="Your answer"
        solo
        v-model="answer"
      ></v-text-field>
      <v-btn        
        large
        color="primary"
        @click="nextQuestion">
        ANSWER
      </v-btn>
    </div>    
    <v-btn
      v-else
      large
      color="primary"
      @click="answerSubmit">
      HAND IN
    </v-btn>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'quizzing',
  data() {
    return {
      answer: '',
      questionNumber: 1, // 題號
      answerSheet: [], // 答案紙
      isShowSubmit: false
    }
  },
  computed: {
    quizQuestions() {
      let questions = this.$store.state.quizQuestions
      return _.shuffle(questions)
    }
  },
  methods:{
    nextQuestion() {
      this.answer = ''
      // 對答案
      var objQuestion = this.quizQuestions[0]
      this.answerSheet.push({
        ...objQuestion,
        isCorrect: this.quizQuestions[0].answer === this.answer ? true : false
      })

      if (this.questionNumber !== this.$store.state.questionCount) {
        this.questionNumber++
        this.$emit('nextQuestion', this.questionNumber)
      } else {
        this.isShowSubmit = true
      }
    },
    answerSubmit() {
      this.$emit('quizResult', this.answerSheet)
    }
  }
}
</script>

<style lang="scss" scoped>

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
