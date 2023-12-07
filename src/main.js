import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'
import { Router } from './router.js'

createApp(App).use(Router).mount('#app')
