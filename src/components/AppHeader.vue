<template>
  <v-navigation-drawer permanent width="240" app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            LOGO
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="GoPage(item.router)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'app-header',
  data() {
    return {
      items: [
        { title: 'Home', icon: 'home', router: '/' },
        { title: 'Vocabulary', icon: 'library_books', router: '/vocabulary' },
        { title: 'Add', icon: 'library_add', router: '/add' },
        { title: 'Quiz', icon: 'alarm', router: '/alarm' },
        { title: 'About', icon: 'info', router: '/about' },
        { title: 'Settings', icon: 'settings', router: '/settings' },
      ],
    }
  },
  methods: {
    GoPage(router) {
      this.$router.push(router)
    }
  }
}
</script>
