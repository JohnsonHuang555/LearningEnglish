<template>
  <div class="elevation-4 vocabulary mb-4">
    <v-layout row class="card-content">
      <v-flex xs1 d-flex justify-center>
        <v-icon v-if="!vocabulary.isFavorite" color="warning">star_border</v-icon>
        <v-icon v-else color="warning">star</v-icon>
      </v-flex>
      <v-flex xs3 class="words-info">{{ vocabulary.word }}</v-flex>
      <v-flex xs1 class="words-info">{{ vocabulary.partOfSpeech }}</v-flex>
      <v-flex xs3 class="words-info">
        <span v-for="(answer,index) in vocabulary.answers" :key="index">
          {{ answer }}
        </span>
      </v-flex>
      <v-flex xs2 class="words-info quiz">Quiz:&nbsp;{{ vocabulary.quizCount }}</v-flex>
      <v-flex xs1 d-flex justify-center>
        <v-icon>edit</v-icon>
      </v-flex>
      <v-flex xs1 d-flex justify-center>
        <v-icon color="error">delete</v-icon>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'vocabulary-cmp',
  props: {
    vocabulary: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.vocabulary {
  background: #fff;
  border-radius: 3px;
  .card-content {
    padding: 16px;
    display: flex;
    align-items: center;
    .words-info {
      font-size: 20px;
    }
    .quiz {
      opacity: 0.7;
    }
  }
}

i {
  cursor: pointer;
}

</style>
