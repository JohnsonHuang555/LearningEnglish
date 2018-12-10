<template>
  <div class="question-content">
    <p class="mb-5">
      <v-icon large color="secondary">info</v-icon>
      Are you ready for quiz ?
    </p>
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
}

p {
  font-size: 28px;
  max-width: 400px;
}

</style>

