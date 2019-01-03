<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs12 class="page-title">Dashboard</v-flex>
    </v-layout>
    <v-layout row class="mb-4">
      <v-flex v-for="(card, index) in infoCards" :key="index" xs3>
        <div class="info-cards elevation-4">
          <div class="info-content mb-2">
            <v-icon large :color="card.color">{{ card.icon }}</v-icon>
            <span class="content-title">{{ card.title }}</span>
          </div>
          <div class="info-value">{{ getValue(card.id) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <div class="card-radius learning-trend elevation-4">
          <div class="mb-3">Learning Trend</div>
          <div v-if="isShowTrend">
            <trend              
              :data="trendData"
              :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
              auto-draw
              smooth>
            </trend>
            <div class="chart-tick">
              <h4>1</h4>
              <h4>{{ daysInMonth }}</h4>
            </div>
          </div>
          <v-progress-circular
            v-else
            indeterminate
            color="secondary"
            :size="50"
            :width="5"
            class="progress-circle"
          ></v-progress-circular>
        </div>
      </v-flex>
      <v-flex xs4>
        <v-date-picker
          full-width
          v-model="date"
          class="card-radius elevation-4"
          type="month"
        ></v-date-picker>        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  components: {
  },
  name: 'home',
  data() {
    return {
      infoCards: [
        { id: 1, icon: 'font_download', color: 'primary', title: 'Total words' },
        { id: 2, icon: 'error', color: 'error', title: 'Wrong words' },
        { id: 3, icon: 'alarm', color: '#3FD2CD', title: 'Total quizzes' },
        { id: 4, icon: 'how_to_reg', color: 'warning', title: 'Login days' },
      ],
      trendData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rate1: [0, 2, 5, 3, 10, 1, 10, 5, 10, 7, 5, 7, 10, 9, 10],
      date: moment().format("YYYY-MM"),
      isShowTrend: true,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    daysInMonth() {
      return moment(this.date).daysInMonth()
    }
  },
  watch: {
    date() {
      this.isShowTrend = false
      setTimeout(() => {
        this.isShowTrend = true
        this.trendData = this.rate1
      }, 1000)
    }
  },
  methods: {
    getValue(id) {
      if (this.userInfo === null)
        return

      switch (id) {
        case 1:
          return this.userInfo.totalWords
        case 2:
          return this.userInfo.wrongWordCount
        case 3:
          return this.userInfo.totalQuizzes
        case 4:
          return this.userInfo.loginDays
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$content: #949494;

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
      font-size: 20px;
      color: $content;
    }
  }
  .info-value {
    font-size: 40px;
    text-align: right;
    color: $content;
  }
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
