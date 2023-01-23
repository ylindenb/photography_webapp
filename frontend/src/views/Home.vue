<script>
  import { mapActions } from 'vuex'
  import Gallery from '../components/Gallery.vue'
  export default {
    components: {
      Gallery
    },
    methods: {
      ...mapActions([
        'imagesStore/fetchImages',
      ]),
    },
    created() {
        this.$store.dispatch('imagesStore/fetchImages');
      }
    }
</script>

<template>
  <Gallery isHome />
</template>
