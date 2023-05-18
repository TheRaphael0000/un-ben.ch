<script>

export default {
  data: () => ({
    summoner: null
  }),

  created() {
    // fetch on init
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const url = `${API_URL}${this.currentBranch}`
      this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
    }
  }
}

</script>


<template>
  <div v-if="summoner">
    <code>{{ summoner }}</code>
    <h1>{{ summoner.displayName }} - lvl. {{ summoner.summonerLevel }}</h1>
  </div>
</template>

<style scoped></style>
