<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-2">
      <v-flex xs12 class="page-title">Add new vocabulary</v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs5>
        <div class="btn-group">
          <v-text-field
            ref="word"
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
            @keyup.enter.native="addVocabulary"
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
            @keyup.enter.native="addVocabulary"
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
            @keyup.enter.native="addVocabulary"
            v-model="answer3"
          ></v-text-field>
          <v-btn v-if="addCount === 2" class="btn-add" flat icon color="error" @click="removeAnswer">
            <v-icon medium>remove_circle</v-icon>
          </v-btn>
        </div>
        <v-btn
          class="mt-4"
          :disabled="isDisableAdd
            || hintIcon === 'error_outline'
            || $store.state.todayVocabularyCount === $store.state.limitedVocabularies"
          large
          color="primary"
          @click="addVocabulary">
          ADD
        </v-btn>
      </v-flex>
      <v-flex offset-xs1 xs4>
        <h3>Hint</h3>
        <p class="mb-5">Lorem ipsum dolor sit amet, consectetur  elit, sed do eiusmod tempor incididunt. Ldefss amess ai klott steds hello world.</p>
        <div class="limit-alert" v-if="$store.state.todayVocabularyCount === $store.state.limitedVocabularies">
          <v-icon class="mr-2" color="error">warning</v-icon>
          <h3>10 words are the limits</h3>
        </div>
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
import vocabularyApi from '../api/vocabulary.js'

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
      if (this.newVocabulary === '' || this.answer1 === '' || this.inputingWord) {
        return true
      } else {
        return false
      }
    },
    today() {
      return this.$store.state.today
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
                case 'verb-intransitive':
                  this.partOfSpeech = 'n.'
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
                case 'preposition':
                  this.partOfSpeech = 'prep.'
                  break
                case 'conjunction':
                  this.partOfSpeech = 'conj.'
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
            this.hintIcon = 'error_outline'
            this.partOfSpeech = ''
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
      if (this.$store.state.todayVocabularyCount >= 10) {
        this.errorMsg = '超過10個'
        this.isShowSnackbar = true
        setTimeout(() => {
          this.isShowSnackbar = false
          this.errorMsg = ''
        }, 4000)
        this.clearAll()
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
        partOfSpeech: this.partOfSpeech,
        quizCount: 0,
        isFavorite: false,
        dateTime: this.today,
        isWrong: false
      }

      vocabularyApi.addVocabulary(data)
        .then(res => {
          this.isShowSnackbar = true
          if (!res.status) {
            this.errorMsg = res.msg
          }

          setTimeout(() => {
            this.isShowSnackbar = false
            this.errorMsg = ''
          }, 4000)

          this.$store.dispatch('getUserInfo')
        })
        .catch(err => {
          console.log(err)
        })

      this.$refs.word.focus()
      this.clearAll()
    },
    clearAll() {
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

.limit-alert {
  display: flex;
}

button {
  margin: 0;
}

h3 {
  color: $error;
}
</style>
