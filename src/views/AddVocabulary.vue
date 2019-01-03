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
            placeholder="New word"
            v-model="newVocabulary"
            @input="debounceInput"
          ></v-text-field>          
          <v-btn
            :loading="inputingWord"
            class="btn-add"
            flat
            disabled
            icon>
            <v-icon medium>{{ hintIcon }}</v-icon>
          </v-btn>          
        </div>
        <div class="btn-group">
          <v-text-field
            class="text-input"
            placeholder="Your answer"
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
            placeholder="Your answer"
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
            placeholder="Your answer"
            @keyup.native.enter="addVocabulary"
            v-model="answer3"
          ></v-text-field>
          <v-btn v-if="addCount === 2" class="btn-add" flat icon color="error" @click="removeAnswer">
            <v-icon medium>remove_circle</v-icon>
          </v-btn>
        </div>
        <v-btn
          class="mt-4"
          :disabled="isDisableAdd || hintIcon === 'error_outline'"
          large
          color="primary"
          @click="addVocabulary">
          ADD
        </v-btn>
      </v-flex>
      <v-flex offset-xs1 xs4>
        <h3>Hint</h3>
        <p>Lorem ipsum dolor sit amet, consectetur  elit, sed do eiusmod tempor incididunt. Ldefss amess ai klott steds hello world.</p>
      </v-flex>
    </v-layout>
    <app-snackbar
      :text="errorMsg !== '' ? errorMsg: 'Add successfully'"
      :color="errorMsg !== '' ? 'error': 'success'"
      @onDismissed="dismissedHandler"
      v-if="isShowSnackbar" />
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
      apiKey: '4ff5d803e06e172e41013c7c4046dc1285cf94b20ceebb66c',
      inputingWord: false,
      hintIcon: '',
      isShowSnackbar: false,
      errorMsg: ''
    }
  },
  watch: {
    newVocabulary(val) {
      if (val) {
        this.inputingWord = true
      } else {
        this.hintIcon = ''
        this.inputingWord = false
      }
    }
  },
  computed: {
    isDisableAdd() {
      if (this.newVocabulary === '' || this.answer1 === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    debounceInput: _.debounce(function(e) {
      if (e) {        
        axios.get(`https://api.wordnik.com/v4/word.json/${e}/definitions?useCanonical=false&limit=200&api_key=${this.apiKey}`)
          .then(res => {
            this.inputingWord = false
            // 表示有此單字
            if (res.data.length > 0) {
              this.hintIcon = 'check'
              switch (res.data[0].partOfSpeech) {
                case 'verb-transitive':
                  this.partOfSpeech = 'v.'
                  break
                case 'noun':
                  this.partOfSpeech = 'n.'
                  break
                case 'adverb':
                  this.partOfSpeech = 'adv.'
                  break
                case 'adjective':
                  this.partOfSpeech = 'adj.'
                  break
                case 'interjection':
                  this.partOfSpeech = 'int.'
                  break
                default:
                  this.partOfSpeech = res.data[0].partOfSpeech
                  break
              }
            } else {
              this.hintIcon = 'error_outline'
              this.partOfSpeech = ''
            }
          })
          .catch(() => {
            console.log('Can not find the word!')
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
      // const loadedVocabularies = this.$store.getters.loadedVocabularies
      // let currentWords = loadedVocabularies.filter(item => {
      //   return item.dateTime === this.today
      // })

      if (this.$store.state.todayVocabularyCount >= 10) {
        this.errorMsg = '超過10個'
        this.isShowSnackbar = true
        setTimeout(() => {
          this.isShowSnackbar = false
          this.errorMsg = ''
        }, 4000)
        return
      }

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
        word: this.newVocabulary.toLowerCase(),
        answers: arrAnswer,
        partOfSpeech: this.partOfSpeech
      }
      this.$store.dispatch('addVocabulary', data).then(() => {
        // this.$store.dispatch('getCurrentDayVocabularies', this.$store.state.today)
        this.isShowSnackbar = true
        setTimeout(() => {
          this.isShowSnackbar = false
        }, 4000)
      })

      this.newVocabulary = ''
      this.partOfSpeech = ''
      this.answer1 = ''
      this.answer2 = ''
      this.answer3 = ''
      this.addCount = 0
    },
    dismissedHandler () {
      this.isShowSnackbar = false
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
