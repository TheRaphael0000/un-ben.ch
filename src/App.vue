<script>

import Summoner from './components/Summoner.vue'
import Menu from './components/Menu.vue'
import Challenge from './components/Challenge.vue'
import Champions from './components/Champions.vue'
import Challenges from './components/Challenges.vue'


export default {
  components: {
    Summoner,
    Menu,
    Challenge,
    Champions,
    Challenges,
  },
  data: () => ({
    summoner: null,
    champions: null,
    masteries: null,
    challenges: null,
  }),

  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
      this.challenges = await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`)
      this.masteries = await window.lcu.fetch("GET", "json", `/lol-collections/v1/inventories/${this.summoner['summonerId']}/champion-mastery`)
      this.champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${this.summoner['summonerId']}/champions-minimal`)
      this.champions = this.champions.filter(c => c.id > 0).sort((a, b) => a.name.localeCompare(b.name))

      for (let champion of this.champions) {
        champion.mastery = this.masteries.find(x => x.championId == champion.id)
      }
    }
  }
}

</script>

<template>
  <Summoner v-if="summoner != undefined" :summoner="summoner" />

  <Menu />

  <Challenges v-if="challenges != undefined" :challenges="challenges" />

  <Champions v-if="champions != undefined" :champions="champions" />
</template>

<style scoped></style>
