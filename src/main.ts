import { createApp } from 'vue'
import "./style.css"

import router from './router'

import App from './App.vue'

let app = createApp(App)
app.use(router)
app.mount('#app')

const challenge_order = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLLENGER"]
const role_order = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]
const grade_order = ["D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+", "S-", "S", "S+"]

app.config.globalProperties.$DD = `/src/static/dragontail-13.24.1/img`
app.config.globalProperties.$DDP = `/src/static/dragontail-13.24.1/13.24.1/img`

export default { challenge_order, role_order }