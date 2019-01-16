<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs12 class="page-title">Settings</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4 class="list-item">
        <h2>Number of questions</h2>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="questionItems"
          :item-text="questionItems.text"
          v-model="questionCount"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4 class="list-item">
        <h2>Answer time <span>(minutes)</span></h2>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="quizTimeItems"
          :item-text="quizTimeItems.text"
          v-model="quizTime"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-5">
      <v-flex xs4 class="list-item">
        <h2>Language</h2>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="languageItems"
          :item-text="languageItems.text"
          v-model="language"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-btn
          class="mr-4"
          large
          color="accent"
          @click="reset"
        >RESET</v-btn>
        <v-btn
          large
          color="primary"
          @click="save"
        >SAVE</v-btn>
      </v-flex>
    </v-layout>
    <app-snackbar
      :text="'Save successfully'"
      :color="'success'"
      @onDismissed="dismissedHandler"
      v-if="isShowSnackbar" />
  </v-container>
</template>

<script>
export default {
  name: 'settings',
  data() {
    return {
      questionItems: [
        { text: '15', value: 15 },
        { text: '20', value: 20 },
        { text: '30', value: 30 },
      ],
      quizTimeItems: [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '15', value: 15 },
      ],
      languageItems: [
        { text: 'English', value: 0 },
        { text: 'Traditional Chinese', value: 1 },
      ],
      questionCount: 15,
      quizTime: 10,
      language: 0,
      isShowSnackbar: false
    }
  },
  mounted() {
    this.questionCount = this.$store.getters.questionCount
    this.quizTime = this.$store.getters.quizTime
    this.language = this.$store.getters.language
  },
  methods: {
    reset() {
      this.questionCount = 10,
      this.quizTime = 10,
      this.language = 0
    },
    save() {
      var settings = {
        questionCount: this.questionCount,
        quizTime: this.quizTime * 60, // 轉成秒
        language: this.language
      }
      this.$store.dispatch('saveSettings', settings).then(() => {
        this.isShowSnackbar = true
        setTimeout(() => {
          this.isShowSnackbar = false
        }, 4000)
      })
    },
    dismissedHandler () {
      this.isShowSnackbar = false
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
}

h2 {
  font-weight: 500;
  span {
    opacity: 0.7;
  }
}

button {
  margin: 0;
}
</style>
