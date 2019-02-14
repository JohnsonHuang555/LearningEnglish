<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs6 class="page-title">Vocabulary</v-flex>
      <v-flex xs2 offset-xs1>
        <v-select :items="filterItems" :item-text="filterItems.text" v-model="filterVal"></v-select>
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
    <!-- <v-progress-circular
      v-if="loading"
      indeterminate
      color="secondary"
      :size="50"
      :width="5"
      class="progress-circle mb-4"
    ></v-progress-circular> -->
    <transition-group
      name="list-complete"
      tag="div"
      class="layout row wrap"
      style="position: relative;"
    >
      <v-flex
        xs12
        v-for="(vocabulary, index) in loadedVocabularies"
        :key="vocabulary._id"
        class="list-complete-item"
      >
        <div
          v-if="dateTimeIndex(vocabulary.dateTime) === index
            && $store.state.today !== vocabulary.dateTime
            && $store.state.todayVocabularyCount !== 0
            && filterVal === 0"
          class="date-time mb-4"
        >{{ vocabulary.dateTime }}</div>
        <vocabulary-cmp :vocabulary="vocabulary"/>
      </v-flex>
      <v-flex
        v-if="loadedVocabularies.length === 0"
        xs12
        class="list-complete-item"
        key="alert"
      >
        <v-alert :value="true" color="error" icon="error">Data no found</v-alert>
      </v-flex>
    </transition-group>
  </v-container>
</template>

<script>
import VocabularyCmp from "@/components/VocabularyCmp.vue";
import vocabularyApi from "@/api/vocabulary.js";
import _ from "lodash";

export default {
  name: "vocabulary",
  components: {
    VocabularyCmp
  },
  data() {
    return {
      vocabularies: [],
      filterItems: [
        { value: 0, text: "All" },
        { value: 1, text: "Favorite" },
        { value: 2, text: "Wrong words" }
      ],
      filterVal: 0,
      searchVal: "",
      isSearching: false
    };
  },
  watch: {
    searchVal(val) {
      if (val) {
        this.filterVal = 0;
        this.isSearching = "primary";
      } else {
        this.isSearching = false;
      }
    },
    filterVal(val) {
      if (val) {
        this.searchVal = "";
      }
    }
  },
  mounted() {
    this.getVocabularies();

    // 先準備好 myfavorite 單字
    this.getFavoriteWords();
  },
  computed: {
    myFavoriteWords: {
      get() {
        return this.$store.state.myFavoriteWords
      },
      set() {

      }
    },
    loadedVocabularies: {
      get() {
        if (this.filterVal === 2) {
          return this.wrongVocabularies;
        } else if (this.filterVal === 1) {
          return this.myFavoriteWords;
        } else if (this.searchVal) {
          return this.vocabularies;
        } else {
          return this.$store.getters.loadedVocabularies;
        }
      },
      set(newVal) {
        this.vocabularies = newVal;
      }
    },
    wrongVocabularies() {
      return this.$store.state.wrongVocabularies;
    }
  },
  methods: {
    getVocabularies() {
      this.$store.dispatch("getVocabularies");
    },
    debounceInput: _.debounce(function(e) {
      if (e) {
        this.filterWords();
      }
    }, 1000),
    dateTimeIndex(dateTime) {
      let i = _.findIndex(this.loadedVocabularies, o => {
        return o.dateTime == dateTime;
      });

      return i;
    },
    async getFavoriteWords() {
      const data = await vocabularyApi.getFavoriteWords();
      this.myFavoriteWords = data;
    },
    async filterWords() {
      const data = await vocabularyApi.filterWords(this.searchVal);
      this.loadedVocabularies = data;
      this.isSearching = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-circle {
  transform: translateX(-50%);
  left: 50%;
}

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

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
  width: 100%;
}
</style>

