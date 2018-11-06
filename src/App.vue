<template>
  <v-app>
    <app-header />
    <v-content>
      <router-view/>
    </v-content>
    <div class="poweredby">Powered by Johnson Huang</div>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.poweredby {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.page-title {
  font-size: 32px;
}
</style>

