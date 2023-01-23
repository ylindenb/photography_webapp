<script>

export default {
  name: "Register",
  data() {
    return {
      successful: false,
      loading: false,
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      street: "",
      zip: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        street: this.street,
        zip: this.zip,
      }

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.successful = true;
          this.loading = false;
          this.$router.push("/");
        },
        (error) => {
          console.log(error);
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col xs="12" sm="8" md="6">
        <v-card class="elevation-5">
          <v-toolbar>
            <v-toolbar-title>
              Register
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
              <v-text-field
                v-model="email"
                id="email"
                prepend-icon="mdi-mail"
                name="email"
                label="Email"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="firstname"
                id="firstname"
                prepend-icon="mdi-city"
                name="firstname"
                label="Vorname"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="lastname"
                id="lastname"
                prepend-icon="mdi-city"
                name="lastname"
                label="Nachname"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="street"
                id="street"
                prepend-icon="mdi-map-marker"
                name="street"
                label="Adresse"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="zip"
                id="zip"
                prepend-icon="mdi-city"
                name="zip"
                label="PLZ"
                type="text"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="handleRegister" class="mb-5 mr-2" variant="tonal" color="success">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
  </v-row>
  </v-container>
</template>