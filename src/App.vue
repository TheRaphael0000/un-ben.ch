<script>
// import CurrentSummoner from './components/CurrentSummoner.vue'

export default {
  data: () => ({
    summoner: null,
    champions: null,
    masteries: null,
    challenges: null,
  }),

  created() {
    // fetch on init
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
      this.champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${this.summoner['summonerId']}/champions-minimal`)
      this.masteries = await window.lcu.fetch("GET", "json", `/lol-collections/v1/inventories/${this.summoner['summonerId']}/champion-mastery`)
      this.challenges = await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`)
    }
  }
}

</script>

<template>
  <div v-if="this.summoner != undefined">
    <h1>{{ this.summoner.displayName }} - lvl. {{ this.summoner.summonerLevel }}</h1>

    <div v-for="champion in this.champions">
      <code>{{ champion }}</code>
      <p>
        {{ champion.squarePortraitPath }}
      </p>
      <!-- <img crossorigin="use-credentials" :src="" /> -->
    </div>
    <!-- <CurrentSummoner greetingMessage="a" /> -->
    <!-- <Champions /> -->
    <!-- <button>Load</button> -->
  </div>
</template>

<style></style>
