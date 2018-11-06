<template>
  <v-container fluid grid-list-sm>
    <v-layout row class="mb-2">
      <v-flex xs12 class="title">Dashboard</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex v-for="(card, index) in infoCards" :key="index" xs3>
        <div class="info-cards">
          <v-icon :color="card.color">{{ card.icon }}</v-icon>
          <span class="info-title">{{ card.title }}</span>
          <div class="info-value">{{ card.value }}</div>
        </div>
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
        { icon: 'error', color: '#D2583F', title: 'Total words', value: 1000 },
        { icon: 'alarm', color: '#3FD2CD', title: 'Total words', value: 1000 },
        { icon: 'how_to_reg', color: '#D2923F', title: 'Total words', value: 1000 },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  border: 1px solid;
}

.container {
  height: 100%;
  padding: 40px;
}

.title {
  font-size: 20px;
}
</style>
