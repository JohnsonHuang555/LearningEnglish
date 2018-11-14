<template>
  <div class="question-content">
    <div class="question-title mb-4">Question</div>
    <h1 class="mb-4">蘋果</h1>
    <v-text-field
      class="mb-5"
      label="Solo"
      placeholder="Your answer"
      solo
    ></v-text-field>
    <v-btn large color="primary">ANSWER</v-btn>
  </div>
</template>

<script>
export default {
  name: 'quizzing'
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
