<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs12 class="page-title">Add new vocabulary</v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs5>
        <div class="btn-group">
          <v-text-field
            class="text-input mb-4"
            label="Solo"
            placeholder="New word"
            solo
            v-model="newVocabulary"
            @input="debounceInput"
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
          <v-btn v-if="addCount < 2" class="btn-add" flat icon color="accent" @click="addMoreAnswer">
            <v-icon medium>add_circle</v-icon>
          </v-btn>
        </div>
        <div class="btn-group">
          <v-text-field
            v-if="addCount >= 1"
            class="text-input"
            label="Solo"
            placeholder="Your answer"
            solo
            v-model="answer2"
          ></v-text-field>
          <v-btn v-if="addCount >= 1" class="btn-add" flat icon color="error" @click="removeAnswer">
            <v-icon medium>remove_circle</v-icon>
          </v-btn>
        </div>
        <div class="btn-group">
          <v-text-field
            v-if="addCount === 2"
            class="text-input mb-4"
            label="Solo"
            placeholder="Your answer"
            solo
            v-model="answer3"
          ></v-text-field>
          <v-btn v-if="addCount === 2" class="btn-add" flat icon color="error" @click="removeAnswer">
            <v-icon medium>remove_circle</v-icon>
          </v-btn>
        </div>
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
import _ from 'lodash'

export default {
  name: 'add-vocabulary',
  data() {
    return {
      newVocabulary: '',
      partOfSpeech: '',
      answer1: '',
      answer2: '',
      answer3: '',
      addCount: 0,
      apiKey: '5a1d59fba2c80d6e9a20b0c83da02b0a4c862a9668479c8f2'
    }
  },
  methods: {
    debounceInput: _.debounce(function(e) {
      if (e) {
        axios.get(`https://api.wordnik.com/v4/word.json/${e}/definitions?useCanonical=false&limit=200&api_key=5a1d59fba2c80d6e9a20b0c83da02b0a4c862a9668479c8f2`)
          .then(res => {
            console.log(res)
            this.partOfSpeech = res.data[0].partOfSpeech
          })
          .catch(error => {
            console.log(error)
          })
      }
    }, 1000),
    addMoreAnswer() {
      this.addCount++
    },
    removeAnswer() {
      this.addCount--
    },
    addVocabulary() {
      let arrAnswer = []
      if (this.addCount === 2) {
        arrAnswer.push(this.answer1)
        arrAnswer.push(this.answer2)
        arrAnswer.push(this.answer3)
      } else if (this.addCount === 1) {
        arrAnswer.push(this.answer1)
        arrAnswer.push(this.answer2)
      } else {
        arrAnswer.push(this.answer1)
      }

      const data = {
        word: this.newVocabulary,
        answers: arrAnswer,
        partOfSpeech: this.partOfSpeech
      }
      this.$store.dispatch('addVocabulary', data)
    }
  }
}
</script>

<style lang="scss" scoped>

$error: #D2583F;

.text-input {
  max-width: 300px;
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
