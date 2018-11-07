<template>
  <v-app>
    <app-header />
    <v-content>
      <router-view/>
    </v-content>
    <!-- <div class="poweredby">Powered by Johnson Huang</div> -->
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
  font-family: custom-sans-serif;
  border: 1px solid;
}

// 中文字體
@font-face {
  font-family: custom-sans-serif;
  src: local("Heiti TC"), local("微軟正黑體"), local("Microsoft JhengHei");
  unicode-range: U+4E00-9FFF;
}

// 英文字體
@font-face {
  font-family: custom-sans-serif;
  src: local(Arial), local(Segoe UI);
  unicode-range: U+00-024F;
}

.poweredby {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.page-title {
  font-size: 28px;
}
</style>

