<template>
  <v-app>
    <Header/>

    <v-main class="bg-blue-grey-darken-3">

      <ErrorAlert v-if="isError"></ErrorAlert>
      <RouterView />
    <Footer/>

    </v-main>
  </v-app>
</template>

<script >
  import { RouterView } from 'vue-router'
  import { mapActions } from 'vuex'
  import Footer from './components/Footer.vue'
  import Header from './components/Header.vue'
  import ErrorAlert from './components/ErrorAlert.vue'

  export default {
    components: {
      ErrorAlert,
      Footer,
      Header,
    },
    methods: {
      ...mapActions([
      'imagesStore/fetchProductCatalogs',
      'imagesStore/fetchCategoryDescriptions',
      'orderStore/fetchOpenOrder'
      ]),
    },
    computed: {
      isError() {
        return this.$store.state.errorHandling.isError;
      },
    },
    created() {
      this.$store.dispatch('imagesStore/fetchProductCatalogs');
      this.$store.dispatch('imagesStore/fetchCategoryDescriptions');
    },
    mounted() {
      if(this.$store.state.auth.user?.id) {
        this.$axios.defaults.headers.common['x-access-token'] = this.$store.state.auth.user.accessToken;
        if(!this.$store.state.auth.status.isAdmin){
          this.$store.dispatch('orderStore/fetchOpenOrder', this.$store.state.auth.user.id );
        }
      }
    }
  }
</script>
