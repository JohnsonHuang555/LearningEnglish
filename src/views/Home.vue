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
          <div class="info-value">{{ card.value }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <img class="elevation-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdueIeXzSQo5V-QLKcw4rcIbDMw5_rWW89w5bWZ11hWH7pibs3" alt="test">
      </v-flex>
      <v-flex xs6>
        <img class="elevation-4" src="https://4ff42o1826ugot79h41hchfc-wpengine.netdna-ssl.com/wp-content/uploads/2014/06/curved-line.png" alt="test">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'home',
  components: {
    
  },
  data() {
    return {
      infoCards: [
        { icon: 'font_download', color: '#3F8ED2', title: 'Total words', value: 1000 },
        { icon: 'error', color: '#D2583F', title: 'Wrong words', value: 500 },
        { icon: 'alarm', color: '#3FD2CD', title: 'Total quizzes', value: 6 },
        { icon: 'how_to_reg', color: '#D2923F', title: 'Login days', value: 30 },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  height: 100%;
  // padding: 40px;
}

.info-cards {
  padding: 20px;
  .info-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-title {
      font-size: 20px;
    }
  }
  .info-value {
    font-size: 40px;
    text-align: right;
  }
}

img {
  width: 100%;
}
</style>
