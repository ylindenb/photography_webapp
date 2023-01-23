<script>
import { mapActions } from 'vuex'
import ErrorAlert from '../components/ErrorAlert.vue'

  export default {
    components: {
      ErrorAlert,
    },
    data () {
      return {
        selectedCategories: [],
        selectedPortfolios: [],
        categories: [],
        portfolios: [],
        image: [],
        showPreview: false,
        url: false,
        valid: false,
      }
    },
    methods: {
      ...mapActions([
        'errorHandling/setError',
        'errorHandling/clearError',
      ]),
      previewImage() {
        this.url = URL.createObjectURL(this.image[0]);
        this.showPreview = true;
      },
      clearForm() {
        this.selectedCategories = [];
        this.selectedPortfolios = [];
        this.image = [];
        this.showPreview = false;
      },
      getCategories() {
        return this.$axios
          .get(import.meta.env.VITE_API_URL + '/categorydescriptions')
          .then(res => {
            this.categories = res.data.categoryDescriptions;
          })
          .catch((error) => {
            this.$store.dispatch('errorHandling/setError', error);
          });
      },
      getPortfolios() {
        return this.$axios
          .get(import.meta.env.VITE_API_URL + '/portfoliodescriptions')
          .then(res => {
            this.portfolios = res.data.portfolioDescriptions;
          })
          .catch((error) => {
            this.$store.dispatch('errorHandling/setError', error);
          });
      },
      uploadImage() {
        let imageData = new FormData();
        imageData.append("image", this.image[0], this.image[0].name)
        imageData.append("categories", this.selectedCategories);
        imageData.append("portfolios", this.selectedPortfolios);
        return this.$axios
        .post(import.meta.env.VITE_API_URL + '/images', imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": this.$store.state.auth.user.accessToken
          }
        })
        .then(res => {
            this.clearForm();
        })
        .catch((error) => {
          this.$store.dispatch('errorHandling/setError', error);
        })
      }
    },
    computed: {
      isError() {
        return this.$store.state.errorHandling.isError;
      },
    },
    created() {
      if(!this.$store.state.auth.status.isAdmin) this.$router.push('/');
      this.getCategories();
      this.getPortfolios();
    },
  }
</script>

<template>
  <ErrorAlert v-if="isError"></ErrorAlert>
  <v-form v-model="valid">
    <v-container fill-height class="w-33 elevation-10 my-4 bg-blue-grey-lighten-4">
      
      <v-row>
        <v-col cols="12">
          <v-img v-if="showPreview" class="elevation-5 rounded-0" :src="url"></v-img>
        </v-col>
        <v-col cols="12" class="pt-4">
          <v-file-input
          show-size
          required
          accept="image/png, image/jpeg, image/jpg"
          label="Foto hochladen"
          variant="filled"
          prepend-icon="mdi-camera"
          @change="previewImage"
          v-model="image"
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="selectedCategories"
            :items="categories"
            item-title="name"
            item-value="_id"
            chips
            :return-object=false
            label="Wähle eine oder mehrere Kategorien aus"
            multiple
          ></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="selectedPortfolios"
            :items="portfolios"
            item-title="name"
            item-value="_id"
            chips
            :return-object=false
            label="Wähle ein oder mehrere Portfolios aus"
            multiple
          ></v-combobox>
        </v-col>
        <v-col align="right">
          <v-btn
            color="success"
            class="mr-4"
            @click="uploadImage"
          >
            Hochladen
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>