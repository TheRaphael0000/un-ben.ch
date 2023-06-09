import { createApp } from 'vue'
import "./style.css"

import router from './router'

import App from './App.vue'

let app = createApp(App)
app.use(router)
app.mount('#app')

app.config.globalProperties.$DD = `src/static/dragontail-13.11.1/img`
app.config.globalProperties.$DDP = `src/static/dragontail-13.11.1/13.11.1/img`