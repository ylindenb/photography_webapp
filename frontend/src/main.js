/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Router
import router from './router/index'

// Store
import store from "./store";

// Plugins
import { registerPlugins } from '@/plugins'
import vuetify from './plugins/vuetify'

import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$axios = axios;

registerPlugins(app)

app
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
