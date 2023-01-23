<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col xs="12" sm="8" md="6">
        <v-card class="elevation-5">
          <v-toolbar>
            <v-toolbar-title>
              Login
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                id="username"
                prepend-icon="mdi-account"
                name="username"
                label="Username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="handleLogin" class="mb-5 mr-2" variant="tonal" color="success">
              Login
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
  </v-row>
  </v-container>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      message: "",
      username: "",
      password: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      const user = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$axios.defaults.headers.common['x-access-token'] = this.$store.state.auth.user.accessToken;
          if(!this.$store.state.auth.status.isAdmin){
            this.$store.dispatch("orderStore/fetchOpenOrder", this.$store.state.auth.user.id);
          }
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>