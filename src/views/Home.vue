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
        { id: 1, icon: 'font_download', color: 'primary', title: 'Total words' },
        { id: 2, icon: 'error', color: 'error', title: 'Wrong words' },
        { id: 3, icon: 'alarm', color: '#3FD2CD', title: 'Total quizzes' },
        { id: 4, icon: 'how_to_reg', color: 'warning', title: 'Login days' },
      ]
    }
  },
  methods: {
    getValue(id) {
      switch (id) {
        case 1:
          return this.$store.state.vocabularies.length
        case 2:
          return 0
        case 3:
          return 0
        case 4:
          return 1
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

img {
  width: 100%;
}
</style>
