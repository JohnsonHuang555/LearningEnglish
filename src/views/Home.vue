<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-2">
      <v-flex xs12 class="page-title">Dashboard</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex v-for="(card, index) in infoCards" :key="index" xs3>
        <div class="info-cards elevation-4">
          <div class="info-content mb-1">
            <v-icon large :color="card.color">{{ card.icon }}</v-icon>
            <span class="content-title">{{ card.title }}</span>
          </div>
          <div class="info-value">{{ getValue(card.id) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs5>
        <v-date-picker
          v-model="date"
          class="elevation-4"
          full-width
          color="primary"
          :events="arrayEvents"
          event-color="green lighten-1"
        ></v-date-picker>
      </v-flex>
      <v-flex xs7>
        <div class="info-cards elevation-4">
          <div class="info-content mb-2">
            <span class="content-title">
              <v-icon class="mr-2">event_note</v-icon>
              {{ date }}
            </span>
            <span class="content-title">
              Score:
              <span class="ml-2" :class="{ 'failed': !isPass, 'pass': isPass }">{{ score }}</span>
            </span>
          </div>
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="secondary"
            :size="40"
            :width="4"
            class="progress-circle mb-4"
          ></v-progress-circular>
          <div v-if="learnRecord.length !== 0 && !loading" class="grid-container">
            <div class="grid-item info-content" :class="{ 'wrong-answer': !item.isCorrect }" v-for="(item, index) in learnRecord" :key="index">
              <span>{{ item.word }}</span>
              <span>{{ item.answers[0] }}</span>
            </div>
          </div>
          <div v-if="learnRecord.length === 0 && !loading">
            <span>No data found</span>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      infoCards: [
        {
          id: 1,
          icon: "font_download",
          color: "primary",
          title: "Total words"
        },
        { id: 2, icon: "error", color: "error", title: "Wrong words" },
        { id: 3, icon: "alarm", color: "#3FD2CD", title: "Total quizzes" },
        { id: 4, icon: "how_to_reg", color: "warning", title: "Login days" }
      ],
      loading: false,
      date: '',
      learnRecord: [],
      score: 0
    }
  },
  watch: {
    date() {
      this.loading = true
      this.getLearnRecord()
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.date = this.$store.state.today
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    arrayEvents() {
      const events = this.userInfo.loginLog.map(item => {
        return item.date
      })

      return events
    },
    isPass() {
      return this.score >= 60 ? true : false
    }
  },
  methods: {
    getValue(id) {
      if (this.userInfo === null) return

      switch (id) {
        case 1:
          return this.userInfo.totalWords
        case 2:
          return this.$store.state.wrongVocabularies.length
        case 3:
          return this.userInfo.totalQuizzes
        case 4:
          return this.userInfo.loginDays
      }
    },
    getLearnRecord() {
      if (this.userInfo.loginLog.length === 0) {
        return
      }

      const data = this.userInfo.loginLog.filter(item => {
        return item.date == this.date
      })

      if (data.length === 0) {
        this.learnRecord = []
        return
      }
      this.score = data[0].score
      this.learnRecord = data[0].questions
    }
  }
}
</script>

<style lang="scss" scoped>
$content: #949494;
$error: #D2583F;
$success: #18ab10;

.container {
  height: 100%;
}

.info-cards {
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;
  .info-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-title {
      font-size: 18px;
      color: $content;
      display: flex;
      align-items: center;
      letter-spacing: 1px;
    }
    .score {
      font-size: 30px;
    }
  }
  .info-value {
    font-size: 40px;
    text-align: right;
    color: $content;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 6px;
  border: 1px solid #eee;
}

.grid-item {
  border-radius: 5px;
  padding: 2px 12px;
  font-size: 18px;
}

.wrong-answer {
  background-color: #f38b76;
  color: white;
}

.failed {
  color: $error;
  font-weight: bold;
}

.pass {
  color: $success;
}

.card-radius {
  background: white;
  border-radius: 3px;
}

.learning-trend {
  font-size: 20px;
  color: $content;
  padding: 20px;
}

.chart-tick {
  display: flex;
  border-top: 1px solid $content;
  padding-top: 15px;
  justify-content: space-between;
  padding: 10px;
  font-size: 16px;
}

.progress-circle {
  margin: 10px;
  transform: translateX(-50%);
  left: 50%;
}

img {
  width: 100%;
}
</style>
