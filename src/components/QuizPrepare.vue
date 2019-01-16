<template>
  <div class="question-content">
    <p class="mb-5">
      <v-icon large color="secondary" class="mr-2">info</v-icon>
      Are you ready for quiz ?
    </p>
    <v-btn large color="primary" :disabled="isEnableStartQuiz" @click="startQuiz">START</v-btn>
    <v-alert
      v-if="isEnableStartQuiz"
      :value="true"
      color="error"
      icon="warning"
      outline
      class="mt-4"
    >
      At least ten vocabularies.
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'quiz-prepare',
  computed: {
    isEnableStartQuiz() {
      return this.$store.state.vocabularies.length >= 10 ? false : true
    }
  },
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
  display: flex;
}

</style>

