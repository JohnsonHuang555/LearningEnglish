<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs12 class="page-title">Add new vocabulary</v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-text-field
          class="text-input mb-4"
          label="Solo"
          placeholder="New word"
          solo
        ></v-text-field>
        <v-text-field
          class="text-input"
          label="Solo"
          placeholder="Your answer"
          solo
        ></v-text-field>
        <v-text-field
          class="text-input mb-4"
          label="Solo"
          placeholder="Your answer"
          solo
        ></v-text-field>
        <v-btn large color="info">
          ADD
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <h3>Hint</h3>
        <p>Lorem ipsum dolor sit amet, consectetur  elit, sed do eiusmod tempor incididunt. Ldefss amess ai klott steds hello world.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'add-vocabulary',
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>

$error: #D2583F;

.text-input {
  max-width: 450px;
}

button {
  margin: 0;
}

h3, p {
  color: $error;
}
</style>
