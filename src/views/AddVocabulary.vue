<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs12 class="page-title">Add new vocabulary</v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs4>
        <div class="btn-group">
          <v-text-field
            class="text-input mb-4"
            label="Solo"
            placeholder="New word"
            solo
            v-model="newVocabulary"
          ></v-text-field>
          <v-btn class="btn-add" disabled flat icon>
            <v-icon medium>check</v-icon>
          </v-btn>
        </div>
        <div class="btn-group">
          <v-text-field
            class="text-input"
            label="Solo"
            placeholder="Your answer"
            solo
            v-model="answer1"
          ></v-text-field>
          <v-btn v-if="addCount === 2" class="btn-add" flat icon color="accent">
            <v-icon medium>add_circle</v-icon>
          </v-btn>
        </div>
        <v-text-field
          v-if="addCount === 1"
          class="text-input"
          label="Solo"
          placeholder="Your answer"
          solo
          v-model="answer2"
        ></v-text-field>
        <v-text-field
          v-if="addCount === 2"
          class="text-input mb-4"
          label="Solo"
          placeholder="Your answer"
          solo
          v-model="answer3"
        ></v-text-field>
        <v-btn large color="primary" @click="addVocabulary">
          ADD
        </v-btn>
      </v-flex>
      <v-flex offset-xs1 xs4>
        <h3>Hint</h3>
        <p>Lorem ipsum dolor sit amet, consectetur  elit, sed do eiusmod tempor incididunt. Ldefss amess ai klott steds hello world.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add-vocabulary',
  data() {
    return {
      newVocabulary: '',
      answer1: '',
      answer2: '',
      answer3: '',
      addCount: 0
    }
  },
  watch: {
    newVocabulary(val) {

    }
  },
  methods: {
    addVocabulary() {
      const data = {

      }
      this.$store.dispatch('addVocabulary')
    }
  }
}
</script>

<style lang="scss" scoped>

$error: #D2583F;

.text-input {
  max-width: 450px;
}

.btn-group {
  display: flex;
}

.btn-add {
  margin: 6px;
}

button {
  margin: 0;
}

h3, p {
  color: $error;
}
</style>
