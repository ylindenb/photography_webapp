<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        select: [],
        portfolios: [],
      }
    },
    methods: {
      ...mapActions([
        'imagesStore/setImagesOfPortfolio',
      ]),
      getPortfolios() {
        return this.$axios
          .get(import.meta.env.VITE_API_URL + '/portfolios')
          .then(res => {
            this.portfolios = res.data.portfolios;
          });
      },
      clickPortfolio(portfolio) {
        this.$store.dispatch('imagesStore/setImagesOfPortfolio', portfolio.images);
        this.$router.push({ name: 'gallery' })
      }
    },
    computed: {
      isPortfolioSet() {
        return this.portfolios.length > 0;
      },
    },
    created() {
      this.getPortfolios();
    },
  }
</script>

<template>
  <v-container fluid>
      <v-row>
        <v-col 
          v-if="isPortfolioSet"
          v-for="portfolio in portfolios"
          :key="portfolio._id"
          xs="12"
          sm="6"
          md="3">
            <v-card v-if="portfolio.images[0]" @click="clickPortfolio(portfolio)" class="elevation-5 bg-primary">
              <v-toolbar class="bg-primary">
                <v-toolbar-title class="text-center">
                  {{ portfolio.portfolioDescriptionId.name }}
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-img
                :src="portfolio.images[0].smallLink"
                aspect-ratio="1"
                cover
                class="bg-grey-lighten-2">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>