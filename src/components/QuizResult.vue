<template>
  <div class="question-content">
    <h2>Correct Rate</h2>
    <p>{{ animatedNumber }} %</p>
    <div class="actions">
      <v-btn color="secondary" @click="seeDetail">SEE DETAIL</v-btn>
      <v-btn color="primary" @click="skipResult">SKIP</v-btn>
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap/all'

export default {
  name: 'quiz-result',
  data() {
    return {
      tweenedNumber: 0,
      correctCount: 0
    }
  },
  props: {
    quizResult: {
      type: Array,
      required: true
    }
  },
  mounted() {
    let wrongAnswer = this.quizResult.filter(item => !item.isCorrect)
    this.correctCount = 100 - ((wrongAnswer.length / this.$store.state.questionCount) * 100)

    this.$store.dispatch('setQuizResult', wrongAnswer)
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    correctCount(newValue) {
      TweenLite.to(this.$data, 1, { tweenedNumber: newValue });
    }
  },
  methods: {
    seeDetail() {
      this.$emit('seeDetail')
    },
    skipResult() {
      this.$emit('skipResult')
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

h2 {
  font-size: 30px;
  font-weight: 500;
}

p {
  font-size: 100px;
}

.actions {
  display: flex;
  justify-content:space-around
}
</style>

