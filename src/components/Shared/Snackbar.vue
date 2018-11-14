<template>
  <v-snackbar
    :value="true"
    :color="color"
    bottom="bottom"
    right="right"
    :timeout="timeout"
  >
    {{ text }}
    <v-btn      
      flat
      @click="onDismissed"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'snackbar',
  props: {
    text: {
      type: String,
      required: true,
      default: ''
    },
    color: {
      type: String,
      required: false,
      default: 'success'
    }
  },
  data() {
    return {
      timeout: 4000,
    }
  },
  methods: {
    onDismissed() {
      this.$emit('onDismissed')
    }
  }
}
</script>
