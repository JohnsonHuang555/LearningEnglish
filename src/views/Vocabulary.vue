<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs6 class="page-title">Vocabulary</v-flex>
      <v-flex xs2 offset-xs1>
        <v-select
          :items="filterItems"
          :item-text="filterItems.text"
          v-model="filterVal"
        ></v-select>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          label="Search..."
          append-icon="search"
          :loading="isSearching"
          v-model="searchVal"
          @input="debounceInput"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <transition-group name="list-complete" tag="div" class="layout row wrap" style="position: relative;">
      <v-flex xs12 v-for="vocabulary in loadedVocabularies" :key="vocabulary.id" class="list-complete-item">
        <vocabulary-cmp :vocabulary="vocabulary"/>
      </v-flex>
      <v-flex v-if="loadedVocabularies.length === 0 && !loading" xs12 class="list-complete-item" key="alert">
        <v-alert
          :value="true"
          color="error"
          icon="error"
        >
          Data no found
        </v-alert>
      </v-flex>
    </transition-group>
  </v-container>
</template>

<script>
import VocabularyCmp from '@/components/VocabularyCmp.vue'
import { database } from 'firebase'
import _ from 'lodash'

export default {
  name: 'vocabulary',
  components: {
    VocabularyCmp
  },
  data() {
    return {
      vocabularies: [],
      filterItems: [
        { value: 0, text: 'All'},
        { value: 1, text: 'Favorite'},
        { value: 2, text: 'Wrong words'}
      ],
      filterVal: 0,
      searchVal: '',
      myFavoriteWords: [],
      isSearching: false,
    }
  },
  watch: {
    searchVal(val) {
      if (val) {
        this.filterVal = 0
        this.isSearching = 'primary'
      } else {
        this.isSearching = false
      }
    },
    filterVal(val) {
      if (val) {
        this.searchVal = ''
      }
    }
  },
  mounted() {
    this.vocabularies = this.$store.getters.loadedVocabularies

    var ref = database().ref('vocabularies').orderByChild('isFavorite').equalTo(true)
      ref.off()
      ref.on('value', data => {
        console.log('fjdsifjsooj')
        const vocabularies = []
        const obj = data.val()
          for (let key in obj) {
            vocabularies.push({
              id: key,
              word: obj[key].word,
              partOfSpeech: obj[key].partOfSpeech,
              answers: obj[key].answers,
              quizCount: obj[key].quizCount,
              isFavorite: obj[key].isFavorite
            })
          }
        this.myFavoriteWords = vocabularies
      })
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    loadedVocabularies: {
      get() {
        if (this.filterVal === 2) {
          return this.wrongVocabularies
        } else if (this.filterVal === 1) {
          return this.myFavoriteWords
        } else if (this.searchVal) {
          return this.vocabularies
        } else {
          return this.$store.getters.loadedVocabularies
        }
      },
      set(newVal) {
        this.vocabularies = newVal
      }
    },
    wrongVocabularies() {
      return this.$store.state.wrongVocabularies
    }
  },
  methods: {
    debounceInput: _.debounce(function(e) {
      if (e) {
        database().ref('vocabularies').orderByChild('word').equalTo(this.searchVal).once('value')
        .then(data => {
          this.isSearching = false
          const vocabularies = []
          const obj = data.val()
            for (let key in obj) {
              vocabularies.push({
                id: key,
                word: obj[key].word,
                partOfSpeech: obj[key].partOfSpeech,
                answers: obj[key].answers,
                quizCount: obj[key].quizCount,
                isFavorite: obj[key].isFavorite
              })
            }
          this.loadedVocabularies = vocabularies
        })
        .catch(error => {
          console.log('search error', error)
        })
      }
    }, 1000),
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

.list-complete-item {
  transition: all 0.5s;
  display: inline-block;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
  width: 100%;
}

</style>

