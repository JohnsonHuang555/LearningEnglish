<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-2">
      <v-flex xs6 class="page-title">Quiz</v-flex>
      <v-flex xs6 class="time-area" align-center justify-end>
        <h2 class="mr-5" v-if="quizStatus === 1">{{ currentQuestionNumber }} / {{ questionCount }}</h2>
        <v-icon
          medium
          class="mr-2"
          :class="remainTimeAlert && counter !== $store.state.quizTime ? 'animated infinite headShake': ''"
          :color="remainTimeAlert ? 'error': 'content'"
          >alarm</v-icon>
        <h2 :class="{'remain-alert': remainTimeAlert }">{{ convertSeconds(quizTime - counter) }}</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="question-layout" :style="[quizStatus !== 3 ? { height: '70vh' } : null ]">
      <v-flex xs12>
        <quiz-prepare v-if="quizStatus === 0" @startQuiz="startQuizHandler"/>
        <quizzing
          v-if="quizStatus === 1 && !isLoading"
          :remainTime="counter"
          @nextQuestion="nextQuestionHandler"
          @quizResult="quizResultHandler"/>
        <quiz-result
          v-if="quizStatus === 2"
          :quizResult="quizResult"
          @seeDetail="seeDetailHandler"
          @skipResult="skipResultHandler"/>
        <quiz-detail
          v-if="quizStatus === 3"
          :quizResult="quizResult"
          />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuizPrepare from '@/components/QuizPrepare.vue'
import Quizzing from '@/components/Quizzing.vue'
import QuizResult from '@/components/QuizResult.vue'
import QuizDetail from '@/components/QuizDetail.vue'
import { setInterval, clearInterval } from 'timers'
import moment from 'moment'

export default {
  name: 'quiz',
  components: {
    QuizPrepare,
    Quizzing,
    QuizResult,
    QuizDetail
  },
  data() {
    return {
      counter: 0,
      quizStatus: 0, // 0 prepare, 1 quizzing, 2 result, 3 detail
      currentQuestionNumber: 1, // 當前題號
      intervalId: null, // 儲存計時器
      quizResult: [], // 考試結果，對完答案後
    }
  },
  computed: {
    quizTime() {
      return this.$store.getters.getQuizTime
    },
    remainTimeAlert() {
      if (this.quizTime - this.counter <= 59) {
        return true
      } else {
        return false
      }
    },
    questionCount() {
      return this.$store.state.questionCount
    },
    isLoading() {
      return this.$store.state.loading
    }
  },
  methods: {
    startQuizHandler() {
      this.quizStatus++
      this.intervalId = setInterval(() => {
        this.counter++
      }, 1000)
      this.$store.dispatch('getQuizQuestions')
    },
    convertSeconds(s) {
      // 當時間到時，停止計時器
      if (s === 0) {
        clearInterval(this.intervalId)
      }
      const min = Math.floor(s / 60)
      const sec = s % 60
      return moment(`'${min}'+'${sec}'`, "mss").format("mm:ss")
    },
    nextQuestionHandler(val) {
      // 更改當前題號
      this.currentQuestionNumber = val
    },
    quizResultHandler(res) {
      this.quizStatus++
      this.quizResult = res
      clearInterval(this.intervalId)
    },
    seeDetailHandler() {
      this.quizStatus++
    },
    skipResultHandler() {
      this.quizStatus = 0
    }
  },
  destroyed() {
    // 離開考試，銷毀考試卷
    this.counter = 0
    this.$store.dispatch('clearQuizQuestions')
  }
}
</script>

<style lang="scss" scoped>

$content: #949494;
$error: #D2583F;

.time-area {
  display: flex;
  h2 {
    font-weight: 500;
  }
}

.remain-alert {
  color: $error
}

.question-layout {
  // height: 70vh;
  display: flex;
  justify-items: center;
  align-items: center;
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
