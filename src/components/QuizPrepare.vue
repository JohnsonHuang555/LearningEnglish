<template>
  <div class="question-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <v-btn large color="primary" @click="startQuiz">START</v-btn>
  </div>
</template>

<script>
export default {
  name: 'quiz-prepare',
  methods: {
    startQuiz() {    
      this.$emit('startQuiz')
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

p {
  font-size: 24px;
  max-width: 300px;
}

</style>

