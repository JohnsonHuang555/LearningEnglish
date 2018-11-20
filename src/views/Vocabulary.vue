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
      <v-flex xs12 v-for="vocabulary in vocabularies" :key="vocabulary.id">
        <vocabulary-cmp :vocabulary="vocabulary"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VocabularyCmp from '@/components/VocabularyCmp.vue'

export default {
  name: 'vocabulary',
  components: {
    VocabularyCmp
  },
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

i {
  cursor: pointer;
}
</style>

