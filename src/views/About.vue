<template>
  <v-container fluid grid-list-xl>
    <v-layout row class="mb-4">
      <v-flex xs12 class="page-title">About</v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="mb-4">What is this app ?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <h1></h1>
      </v-flex>
      <v-flex xs12>
        <h1 class="mb-4">
          <img width="28" height="28" class="mr-2" src="../assets/github-logo.svg" alt="github">
          <span>Github</span>
        </h1>
        <p>https://github.com/JohnsonHuang555</p>
        <h1></h1>
      </v-flex>
      <v-flex xs12>
        <h1 class="mb-4">
          <v-icon large class="mr-2">bug_report</v-icon>
          <span>Bug report</span>
        </h1>
        <p>imchung0707@gmail.com</p>
        <h1></h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="scss" scoped>

img {
  margin: 7px;
}

h1 {
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}

p {
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 32px;
}

</style>
