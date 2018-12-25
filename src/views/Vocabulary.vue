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
      <v-flex xs12 v-for="(vocabulary, index) in loadedVocabularies" :key="vocabulary.id" class="list-complete-item">
        <div
          v-if="dateTimeIndex(vocabulary.dateTime) === index && $store.state.today !== vocabulary.dateTime"
          class="date-time mb-4"
          >{{ vocabulary.dateTime }}</div>
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
import moment from 'moment'

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
    this.getVocabularies()    

    // 先準備好 myfavorite 單字
    var ref = database().ref('vocabularies').orderByChild('isFavorite').equalTo(true)
      ref.off()
      ref.on('value', data => {
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
    },
  },
  methods: {
    getVocabularies() {
      // 取得所有單字，規則如下
      // 當天沒有輸入 顯示前一天
      // 當天有輸入且有輸滿 顯示當天
      // 當天有輸入未輸滿 顯示前一天加當天
      const wordCount = this.$store.state.todayVocabularyCount
      const limit = this.$store.state.limitedVocabularies
      const yesterday = moment().add(-1, 'days').format("YYYY-MM-DD")
      if (this.loadedVocabularies.length > 0) {
        return
      }

      if (wordCount > 0 && wordCount === limit) {
        this.loadedVocabularies = this.$store.getters.loadedVocabularies 
        return
      }

      this.$store.dispatch('getCurrentDayVocabularies', yesterday)
    },
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
                isFavorite: obj[key].isFavorite,
                dateTime: obj[key].dateTime
              })
            }
          this.loadedVocabularies = vocabularies
        })
        .catch(error => {
          console.log('search error', error)
        })
      }
    }, 1000),
    dateTimeIndex(dateTime) {
      let i = _.findIndex(this.loadedVocabularies, (o) => {
        return o.dateTime == dateTime
      })

      return i
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

.date-time {
  text-align: center;
  color: #666;
  font-size: 18px;
  letter-spacing: 3px;
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

