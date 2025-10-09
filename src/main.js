import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/routes/index.js'
import '@/assets/scss/main.scss'
import 'primeicons/primeicons.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
