<template>
  <v-app>
    <app-header />
    <v-content class="app-content">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
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

$accent: #BBB;
$info: #F5F5F5;

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: custom-sans-serif;
  // border: 1px solid;
}

// ::-webkit-scrollbar { 
//     display: none; 
// }

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $info; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: $accent;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
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

.app-content {
  background: #F5F5F5;
}

.poweredby {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.page-title {
  font-size: 28px;
  color: #949494;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>

