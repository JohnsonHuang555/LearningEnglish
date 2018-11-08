<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs12 class="page-title">Settings</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <h2>Number of questions</h2>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="items"
          label="Solo field"
          solo
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <h2>Answer time</h2>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="items"
          label="Solo field"
          solo
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <h2>Language</h2>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="items"
          label="Solo field"
          solo
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-btn class="mr-4">RESET</v-btn>
        <v-btn>SAVE</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'settings',
  data() {
    return {
      items: ['test', 'test2', 'test3']
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-weight: 500;
}

button {
  margin: 0;
}
</style>
