<template>
  <div class="question-content">
    <div class="question-title mb-4">Question</div>
    <h1 class="mb-4">
      <span
        v-for="question in quizQuestions[questionIndex].questions"
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
    <v-btn large color="primary">ANSWER</v-btn>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'quizzing',
  data() {
    return {
      answer: '',
      questionIndex: 0 // 題號 index 從0開始計算
    }
  },
  computed: {
    quizQuestions() {
      let questions = this.$store.state.quizQuestions
      return _.shuffle(questions)
    }
  },
  methods:{
    
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
