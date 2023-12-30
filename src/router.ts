import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import ChallengesList from './pages/ChallengesList.vue'
import ChampionSelect from './pages/ChampionSelect.vue'
import ChallengesChampions from './pages/ChallengesChampions.vue'
import Masteries from './pages/Masteries.vue'
import FriendsChallenge from './pages/FriendsChallenge.vue'
import InGame from './pages/InGame.vue'
import Multisearch from './pages/Multisearch.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/ChallengesList', component: ChallengesList },
    { path: '/ChampionSelect', component: ChampionSelect },
    { path: '/ChallengesChampions', component: ChallengesChampions },
    { path: '/Masteries', component: Masteries },
    { path: '/FriendsChallenge/:challenge_id', component: FriendsChallenge },
    { path: '/InGame', component: InGame },
    { path: '/Multisearch', component: Multisearch },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router