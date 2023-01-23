<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        // selectedStatus: []
      }
    },
    methods: {
      ...mapActions([
        'orderStore/fetchOrdersOfUser',
      ]),
      getOrders() {
        this.$store.dispatch('orderStore/fetchOrdersOfUser', this.$store.state.auth.user.id);
      },
      getOrderPrice(order) {
        let price = 0;
        let shippingCost = Math.max(...order.products.map(product => product.productCatalog.shipping_cost))
        order.products.forEach(element => {
          price = price + element.productCatalog.price
        });
        return price + shippingCost;
      },
    },
    computed: {
      orders() {
        if (this.$store.state.orderStore?.orders) {
          return this.$store.state.orderStore.orders;
        } else return false;
      },
    },
    mounted() {
      this.getOrders();
    }
}
</script>

<template>
  <v-table v-if="orders">
    <thead>
      <tr>
        <th class="text-center">
          #
        </th>
        <th class="text-center">
          Bestellung
        </th>
        <th class="text-center">
          Produkte (Id, Größe, Format, Preis)
        </th>
        <th class="text-center">
          Gesamtpreis inkl. Lieferkosten
        </th>
        <th class="text-center">
          Status
        </th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr
        v-for="order, index in orders"
        :key="order._id"
      >
        <td>{{ index + 1}}</td>
        <td>{{ order._id }}</td>
        <td><div v-for="product in order.products"> {{ product._id }} {{ product.productCatalog.size.toUpperCase() }} {{ product.productCatalog.format }}cm {{ product.productCatalog.price }},00 €</div></td>
        <td> {{ getOrderPrice(order) }},00€ </td>
        <td> {{ order.status }} </td>
      </tr>
    </tbody>
  </v-table>
</template>