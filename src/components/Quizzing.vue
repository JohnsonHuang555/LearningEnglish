<template>
  <div>
    <div v-if="!isShowSubmit" class="question-content">
      <div class="question-title mb-4">Question</div>
      <h1 class="mb-4" v-if="quizQuestions.length">
        <span
          v-for="question in quizQuestions[questionNumber - 1].answers"
          :key="question.id"
        >{{ question }}</span>
      </h1>
      <v-text-field
        class="mb-5"
        placeholder="Your answer"
        v-model="answer"
        ref="answer"
        @keyup.enter="nextQuestion"
      ></v-text-field>
      <v-btn large color="primary" @click="nextQuestion">ANSWER</v-btn>
    </div>
    <div v-else class="question-content">
      <p class="mb-5">
        <v-icon large color="secondary" class="mr-2">info</v-icon>Ready for hand in ?
      </p>
      <v-btn large color="primary" @click="answerSubmit">HAND IN</v-btn>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "quizzing",
  data() {
    return {
      answer: "",
      questionNumber: 1, // 題號
      answerSheet: [], // 答案紙
      isShowSubmit: false
    };
  },
  props: {
    remainTime: {
      type: Number,
      default: 0, // 300 即為時間結束
      required: true
    }
  },
  computed: {
    quizQuestions() {
      let questions = this.$store.getters.quizQuestions;
      return _.shuffle(questions);
    },
    quizTime() {
      return this.$store.state.quizTime
    }
  },
  watch: {
    remainTime(val) {
      if (val === this.quizTime) {
        this.quizQuestions.forEach((item, i) => {
          if (i < this.questionNumber - 1) {
            return
          }

          this.answerSheet.push({
            ...item,
            isCorrect: false
          })
        })

        this.$emit("quizResult", this.answerSheet);
      }
    }
  },
  methods: {
    nextQuestion() {
      if (this.answer === "") {
        return;
      }

      // 對答案
      var objQuestion = this.quizQuestions[this.questionNumber - 1];
      this.answerSheet.push({
        ...objQuestion,
        isCorrect:
          this.quizQuestions[this.questionNumber - 1].word === this.answer
            ? true
            : false
      });

      if (this.questionNumber !== this.$store.state.questionCount) {
        this.questionNumber++;
        this.$emit("nextQuestion", this.questionNumber);
      } else {
        this.isShowSubmit = true;
      }

      // 清空答案
      this.answer = "";
      this.$refs.answer.focus();
    },
    answerSubmit() {
      this.$emit("quizResult", this.answerSheet);
    }
  }
};
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

p {
  font-size: 28px;
  max-width: 400px;
  display: flex;
}
</style>
