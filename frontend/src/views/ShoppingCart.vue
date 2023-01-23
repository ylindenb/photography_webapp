<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        select: [],
        selectedProduct: {},
      }
    },
    methods: {
      ...mapActions([
        'imagesStore/setImagesOfPortfolio',
        'orderStore/clearOrder',
        'orderStore/sendOrder'
      ]),
      deleteProduct(product) {
        let finalProducts = this.$store.state.orderStore.order.products;
        const index = finalProducts.indexOf(product);
        if (index > -1) { // only splice array when item is found
          finalProducts.splice(index, 1); // 2nd parameter means remove one item only
        }
        let finalOrder = this.order;
        finalOrder.products = finalProducts;
        this.$store.dispatch('orderStore/updateOrder', finalOrder)
      },
      sendOrder() {
        let finalOrder = this.order;
        finalOrder.status = 'In Bearbeitung'
        this.$store.dispatch('orderStore/sendOrder', finalOrder)
        this.$router.push('/');
      }
    },
    computed: {
      order() {
        if (this.$store.state.orderStore?.order) {
          return this.$store.state.orderStore.order;
        }
      },
      orderPrice() {
        if(this.$store.state.orderStore?.order?.products.length > 0){
          let price = 0;
          let shippingCost = Math.max(...this.$store.state.orderStore.order.products.map(product => product.productCatalog.shipping_cost))
          this.$store.state.orderStore.order.products.forEach(element => {
            price = price + element.productCatalog.price
          });
          return price + shippingCost;
        }
        return false;
      }
    },
    created() {},
  }
</script>

<template>
  <v-toolbar
      color="white"
    >
    <v-toolbar-title v-if="orderPrice">Gesamtpreis (inklusive Lieferkosten): {{ orderPrice }},00€</v-toolbar-title>
    <v-toolbar-title v-else>Gesamtpreis: 0,00€</v-toolbar-title>

      <v-btn
        @click="sendOrder()">
        Bestellen
      </v-btn>
    </v-toolbar>
  <v-container fluid>
    
    <v-row v-if="order">
      <v-col cols="12" v-for="(product, i) in order.products">
        <v-card
          class="mx-auto"
          max-width="500"
        >
          <v-img
            :src="product.image.smallLink"
            height="200px"
            cover
          ></v-img>

          <v-card-text>
            Größe: {{ product.productCatalog.size.toUpperCase() }}
            <br/>
            Format: {{ product.productCatalog.format }}cm
          </v-card-text>

          <v-card-actions class="ml-2">
            <p>Preis: {{ product.productCatalog.price }},00€</p>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              variant="text"
              @click="deleteProduct(product)"
            >
              Entfernen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>