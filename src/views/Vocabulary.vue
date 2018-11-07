<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs6 class="page-title">Vocabulary</v-flex>
      <v-flex xs2>
        <v-select
          :items="items"
          label="Standard"
        ></v-select>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          label="Search..."
          append-icon="search"
        ></v-text-field>
      </v-flex>
      <v-flex xs1 class="sort">
        <v-icon class="sort-icon">sort</v-icon>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 v-for="vocabulary in vocabularies" :key="vocabulary.id" class="mb-4">
        <div class="elevation-4 vocabulary">
          <v-layout row class="card-content">
            <v-flex xs1 d-flex justify-center>
              <v-icon>star_border</v-icon>
            </v-flex>
            <v-flex xs3 class="words-info">{{ vocabulary.word }}</v-flex>
            <v-flex xs1 class="words-info">{{ vocabulary.partOfSpeech }}</v-flex>
            <v-flex xs3 class="words-info">{{ vocabulary.answer }}</v-flex>
            <v-flex xs2 class="words-info quiz">Quiz:&nbsp;{{ vocabulary.quizCount }}</v-flex>
            <v-flex xs1 d-flex justify-center>
              <v-icon>edit</v-icon>
            </v-flex>
            <v-flex xs1 d-flex justify-center>
              <v-icon>delete</v-icon>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'vocabulary',
  data() {
    return {
      items: ['All', 'Favorite', 'Wrong words'],
      vocabularies: [
        { id: 1, word: 'apple', partOfSpeech: 'n.', answer: '蘋果', quizCount: 5, isFavorite: false },
        { id: 2, word: 'banana', partOfSpeech: 'n.', answer: '香蕉', quizCount: 3, isFavorite: false },
        { id: 3, word: 'claver', partOfSpeech: 'adj.', answer: '聰明的', quizCount: 15, isFavorite: true },
        { id: 4, word: 'device', partOfSpeech: 'n.', answer: '設備', quizCount: 8, isFavorite: true },
        { id: 5, word: 'eat', partOfSpeech: 'v.', answer: '吃', quizCount: 2, isFavorite: false },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.sort {
  display: flex;
  align-items: center;
  .sort-icon {
    cursor: pointer;
  }
}

.vocabulary {
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
</style>

