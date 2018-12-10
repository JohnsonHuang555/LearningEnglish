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
      <v-flex xs6>
        <!-- <img class="elevation-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdueIeXzSQo5V-QLKcw4rcIbDMw5_rWW89w5bWZ11hWH7pibs3" alt="test"> -->
        <line-chart
          id="line" 
          :data="lineData"
          xkey="year"
          ykeys='["a", "b"]'
          line-colors='["#FF6384", "#36A2EB"]'
          grid="true"
          grid-text-weight="bold"
          resize="true">
        </line-chart>
      </v-flex>
      <v-flex xs6>
        <v-date-picker
          v-model="date"
          full-width
          landscape
          class="date-time elevation-4"
        ></v-date-picker>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Raphael from 'raphael/raphael'
global.Raphael = Raphael

import { LineChart } from 'vue-morris'

export default {
  components: {
    // DonutChart, 
    // BarChart, 
    LineChart, 
    // AreaChart
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
      date: new Date().toISOString().substr(0, 10),
      lineData: [
        { year: '2013', a:10, b:5 },
        { year: '2014', a:40, b:15 },
        { year: '2015', a:20, b:25 },
        { year: '2016', a:30, b:20 }
      ],
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
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

.date-time {
  border-radius: 5px;
}

.line-chart {
  background: white;
  padding: 10px;
}

img {
  width: 100%;
}
</style>
