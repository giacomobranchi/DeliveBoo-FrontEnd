import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'
import { router } from './router.js'
import braintree from 'braintree-web';
import { createPinia } from 'pinia';

// Crea un'istanza di Pinia
const app = createApp(App);
const pinia = createPinia();

// Usa il plugin piniaPluginPersistedstate con Pinia
pinia.use(piniaPluginPersistedstate);
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Crea l'app Vue e usa sia il router che Pinia
app.use(pinia);
app.use(router);
app.mount('#app');