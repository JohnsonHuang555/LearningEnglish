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
              <v-icon v-if="!vocabulary.isFavorite" color="warning">star_border</v-icon>
              <v-icon v-else color="warning">star</v-icon>
            </v-flex>
            <v-flex xs3 class="words-info">{{ vocabulary.word }}</v-flex>
            <v-flex xs1 class="words-info">{{ vocabulary.partOfSpeech }}</v-flex>
            <v-flex xs3 class="words-info">{{ vocabulary.answer }}</v-flex>
            <v-flex xs2 class="words-info quiz">Quiz:&nbsp;{{ vocabulary.quizCount }}</v-flex>
            <v-flex xs1 d-flex justify-center>
              <v-icon>edit</v-icon>
            </v-flex>
            <v-flex xs1 d-flex justify-center>
              <v-icon color="error">delete</v-icon>
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
    }
  },
  computed: {
    vocabularies() {
      return this.$store.state.vocabularies
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
  background: #fff;
  border-radius: 3px;
  .card-content {
    padding: 16px;
    display: flex;
    align-items: center;
    .words-info {
      font-size: 24px;
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

