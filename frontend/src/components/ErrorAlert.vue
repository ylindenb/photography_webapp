<script>

  export default {
    name: "ErrorAlert",
    computed: {
      getErrorMessage() {
        return this.$store.state.errorHandling.errorMessage;
      },
    },
  }
</script>

<template>
  <v-container>
    <v-alert
     type="error"
     closable
     close-label="Schließen">
      {{ getErrorMessage }}
    </v-alert>
  </v-container>
</template>