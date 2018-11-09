<template>
  <v-navigation-drawer
    class="secondary"
    permanent
    width="240"
    app>
    <div class="nav-content">
      <h3>Version 1.0.0</h3>
      <v-toolbar flat class="secondary">
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Learning
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0">
        <v-list-tile
          :class="{ 'route-active': isActive(item.router) }"
          class="route-basic"
          v-for="item in items"
          v-model="item.icon"
          :key="item.title"
          exact
          @click="GoPage(item.router)"
        >
          <v-list-tile-action>
            <v-icon :color="item.router === $route.path ? 'primary' : 'accent'">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="route-title" :class="{ 'router-title-active': item.router === $route.path }">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
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
        { title: 'Add', icon: 'library_add', router: '/add-vocabulary' },
        { title: 'Quiz', icon: 'alarm', router: '/quiz' },
        { title: 'About', icon: 'info', router: '/about' },
        { title: 'Settings', icon: 'settings', router: '/settings' },
      ],
    }
  },
  methods: {
    isActive(router) {
      if (router === this.$route.path) {
        return true
      }
      return false
    },
    GoPage(router) {
      this.$router.push(router)
    }
  }
}
</script>

<style lang="scss" scoped>

$info: #3F8ED2;
$accent: #BBB;

.nav-content {
  position: relative;
  height: 100%;
}

.route-basic {
  color: $accent;
}

// .route-basic:hover {
//   background: #7b7b7b;
// }

.route-title {
  font-size: 18px;
  color: $accent;
}

.router-title-active {
  color: $info;
}

.route-active {
  border-left: 5px solid $info;
  background: #DDEAEF;
}

h3 {
  position: absolute;
  font-weight: 500;
  font-size: 14px;
  color: #bbb;
  bottom: 10px;
  margin-left: 120px;
  transform: translateX(-50%);
}
</style>

