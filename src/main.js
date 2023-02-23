import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { app,db } from './firebase.js'



const app = createApp(App)
app.use(router)
app.mount('#app')

