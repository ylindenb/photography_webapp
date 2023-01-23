<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        orderStatus: ['In Bearbeitung', 'Versendet', 'Storniert', 'Abgeschlossen'],
        selectedStatus: []
      }
    },
    methods: {
      ...mapActions([
        'orderStore/fetchOrders',
        'orderStore/updateOrder'
      ]),
      getOrders() {
        this.$store.dispatch('orderStore/fetchOrders').then(() => {
          this.selectedStatus = this.$store.state.orderStore.orders.map(order => order.status);
        });
      },
      editOrderStatus(status, order) {
        let finalOrder = order;
        finalOrder.status = status;
        this.$store.dispatch('orderStore/updateOrder', finalOrder);
      }
    },
    computed: {
      orders() {
        if (this.$store.state.orderStore?.orders) {
          return this.$store.state.orderStore.orders;
        } else return false;
      },
      /*selectedStatus() {
        if (this.$store.state.orderStore?.orders) {
          return this.$store.state.orderStore.orders.map(order => order.status);
        }
      }*/
    },
    mounted() {
      this.getOrders();
    }
}
</script>

<template>
  <v-table v-if="orders" class="text-center">
    <thead>
      <tr>
        <th class="text-center">
          User
        </th>
        <th class="text-center">
          Bestellung
        </th>
        <th class="text-center">
          Produkte (Id, Größe, Preis)
        </th>
        <th class="text-center">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="order, index in orders"
        :key="order._id"
      >
        <td>{{ order.user.firstname }} {{ order.user.lastname }}</td>
        <td>{{ order._id }}</td>
        <td><div v-for="product in order.products"> {{ product._id }} {{ product.productCatalog.size.toUpperCase() }} {{ product.productCatalog.format }}cm {{ product.productCatalog.price }},00 €</div></td>
        <td>
          <v-select
            label="Select"
            v-model="selectedStatus[index]"
            :items="orderStatus"
          ></v-select>
        </td>
        <td>
          <v-icon
            small
            class="mr-2"
            @click="editOrderStatus(selectedStatus[index], order)"
          >
            mdi-content-save
          </v-icon>
        </td>
      </tr>
    </tbody>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-table>
</template>