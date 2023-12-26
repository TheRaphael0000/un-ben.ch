import { createApp } from 'vue'
import "./style.css"

import router from './router'

import App from './App.vue'

let app = createApp(App)
app.use(router)
app.mount('#app')

const challenge_order = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLLENGER"]
const role_order = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]

app.config.globalProperties.$DD = `/src/static/dragontail-13.24.1/img`
app.config.globalProperties.$DDP = `/src/static/dragontail-13.24.1/13.24.1/img`

export default { challenge_order, role_order }