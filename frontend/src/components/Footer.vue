<template>
    <v-footer app absolute
      class="bg-grey-darken-4 text-center d-flex flex-column"
    >
      <div>
        <v-btn
          class="mx-4"
          icon="mdi-facebook"
          variant="text"
        ></v-btn>
        <v-btn
          class="mx-4"
          icon="mdi-twitter"
          variant="text"
        ></v-btn>
        <v-btn
          class="mx-4"
          icon="mdi-linkedin"
          variant="text"
        ></v-btn>
        <v-btn
          class="mx-4"
          icon="mdi-instagram"
          variant="text"
        ></v-btn>
      </div>

      <v-divider></v-divider>
      <div>
        {{ new Date().getFullYear() }} — <strong>Moe Photography</strong>
      </div>
    </v-footer>
  </template>
  
  <script setup>
    //
  </script>