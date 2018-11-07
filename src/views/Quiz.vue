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
        <div class="question-content">
          <div class="question-title mb-4">Question</div>
          <h1 class="mb-4">蘋果</h1>
          <v-text-field
            class="mb-5"
            label="Solo"
            placeholder="Your answer"
            solo
          ></v-text-field>
          <v-btn>ANSWER</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'quiz'
}
</script>

<style lang="scss" scoped>

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
