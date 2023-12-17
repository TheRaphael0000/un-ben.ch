import { createApp } from 'vue'
import "./style.css"

import router from './router'

import App from './App.vue'

let app = createApp(App)
app.use(router)
app.mount('#app')

let challenge_order = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLLENGER"]

app.config.globalProperties.$DD = `/src/static/dragontail-13.24.1/img`
app.config.globalProperties.$DDP = `/src/static/dragontail-13.24.1/13.24.1/img`
app.config.globalProperties.$CHALLENGE_ORDER = challenge_order

export default { challenge_order }