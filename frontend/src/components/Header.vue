
<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        delete this.$axios.defaults.headers.common['x-access-token'];
        this.$router.push('/');
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      isAdmin() {
        return this.$store.state.auth.status.isAdmin;
      },
      orderProductCount() {
        return this.$store.state.orderStore?.order?.products ?
           this.$store.state.orderStore.order.products?.length :
           0;
      }
    }
  }
</script>
  
  <template>
    <v-toolbar class="bg-grey-darken-4" elevation="4">
        <v-toolbar-items>
        <v-btn flat>
            <router-link style="text-decoration: none; color: inherit;" to="/">Startseite</router-link>
        </v-btn>
        <v-btn flat>
            <router-link style="text-decoration: none; color: inherit;" to="/portfolios">Portfolios</router-link>
        </v-btn>
        <v-btn flat v-if="isAdmin">
            <router-link
            style="text-decoration: none; color: inherit;" to="/upload">Upload</router-link>
        </v-btn>
        </v-toolbar-items>
        <v-spacer/>
        <v-spacer v-if="!isAdmin && loggedIn"></v-spacer>

        <v-toolbar-title>Moe Photography</v-toolbar-title>
        
        <v-spacer/>
        <div v-if="!loggedIn">
          <v-btn flat>
              <router-link
              style="text-decoration: none; color: inherit;" to="/register">Registrieren</router-link>
          </v-btn>
          <v-btn flat>
              <router-link
              style="text-decoration: none; color: inherit;" to="/login">Login</router-link>
          </v-btn>
        </div>
        <div v-else>
          <v-btn flat v-if="isAdmin">
              <router-link
              style="text-decoration: none; color: inherit;" to="/orders">Bestellungen</router-link>
          </v-btn>
          <v-btn v-if="!isAdmin" flat prepend-icon="mdi-cart">
          <router-link
            style="text-decoration: none; color: inherit;" to="/cart">Warenkorb ({{orderProductCount}})</router-link>
          
          </v-btn>
          <v-btn v-if="!isAdmin" flat>
            <router-link
            style="text-decoration: none; color: inherit;" to="/customerOrders">Bestellungen</router-link>
          
          </v-btn>
          <v-btn flat @click="logout">
            Logout
          </v-btn>
        </div>
    </v-toolbar>
</template>