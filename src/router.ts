import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import ChallengesList from './pages/ChallengesList.vue'
import ChampionSelect from './pages/ChampionSelect.vue'
import ChallengesChampions from './pages/ChallengesChampions.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/ChallengesList', component: ChallengesList },
    { path: '/ChampionSelect', component: ChampionSelect },
    { path: '/ChallengesChampions', component: ChallengesChampions },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router