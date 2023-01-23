<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      isHome: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        modalImage: {},
        dialog: false,
        product: {},
        category: {},
        isFiltered: false,
      }
    },
    methods: {
      ...mapActions([
        'imagesStore/fetchFilteredImages',
        'orderStore/createOrder',
        'orderStore/updateOrder'
      ]),
      openModal(image) {
        this.modalImage = image;
        this.dialog = true;
      },
      cancel() {
        this.dialog = false
      },
      orderImage() {
        let finalProduct = {
            productCatalog: this.product.id,
            image: this.modalImage._id
        };
        if(Object.keys(this.$store.state.orderStore.order).length > 0) {
          let order = this.$store.state.orderStore.order;
          order.products.push(finalProduct)
          this.$store.dispatch('orderStore/updateOrder', order)
        } else {
          let userProductObj = {
            products: [{
              productCatalog: this.product.id,
              image: this.modalImage._id
            }],
            userId: this.$store.state.auth.user.id
          }
          this.$store.dispatch('orderStore/createOrder', userProductObj)
        }
        this.dialog = false;
      },
      filterCategory() {
       if (typeof this.category === 'string') {
          this.isFiltered = true;
          this.$store.dispatch('imagesStore/fetchFilteredImages', this.category, this.images);
          return;
        }
        this.isFiltered = false;
      },
    },
    computed: {
      images() {
        if(this.$store.state.imagesStore.imagesInPortfolio == undefined && !this.isHome) {
          this.$router.push('/portfolios');
          return;
        }
        if(this.isHome && !this.isFiltered) {
          return this.$store.state.imagesStore.images;
        }
        if(this.isFiltered) {
          return this.$store.state.imagesStore.filteredImages;
        }
        return this.$store.state.imagesStore.imagesInPortfolio;
      },
      productCatalogs() {
        return this.$store.state.imagesStore.productCatalogs;
      },
      categoryDescriptions() {
        return this.$store.state.imagesStore.categoryDescriptions;
      },
      labels() {
        let labels = [];
        for (let index = 0; index < this.productCatalogs.length; index++) {
          labels.push({
            id: this.productCatalogs[index]._id,
            label: `${this.productCatalogs[index].size.toUpperCase()} ${this.productCatalogs[index].format}cm ${this.productCatalogs[index].price},00€`
          })
        }
        return labels;
      },
      isProductSelected() {
        if(this.product.id) return false;
        return true;
      }
    },
  }
</script>

<template>
  <v-container fluid class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-dialog v-model="dialog" max-width="50%" @keydown.esc="cancel">
        <v-card>
          <v-img :src="modalImage.largeLink" alt="" contain/>
          <v-card-actions class="bg-grey-darken-4">
            <v-radio-group column v-model="product">
              <v-radio v-for="label in labels" :label="label.label" :key="label.id" :value="label"></v-radio>
            </v-radio-group>
            <v-btn
              :disabled="isProductSelected"
              class="bg-green mr-5"
              @click="orderImage"
            >
              Zum Warenkorb hinzufügen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col v-if="isHome" align-self="center" cols="12">
          <v-chip-group
            active-class="primary--text"
            column
            v-model="category"
            @click="filterCategory()"
          >
            <v-chip
              v-for="categoryDescription in categoryDescriptions"
              :key="categoryDescription._id"
              :value="categoryDescription._id"
            >
              {{ categoryDescription.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col
          v-for="image in images"
          :key="image"
          class="d-flex child-flex"
          cols="3"
        >
          <v-img
            @click="openModal(image)"
            :src="image.smallLink"
            :lazy-src="image.smallLink"
            aspect-ratio="1"
            cover
            class="bg-grey-lighten-2 elevation-5"
          >
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
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
