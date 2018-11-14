<template>
  <div class="question-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.</p>
    <v-btn large color="primary">START</v-btn>
  </div>
</template>

<script>
export default {
  name: 'quiz-prepare'
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
  font-size: 30px;
  max-width: 300px;
}

</style>

