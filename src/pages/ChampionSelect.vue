<script>

import ChampionChallenges from '../components/ChampionChallenges.vue'
import Context from '../Context'

export default {
  components: {
    ChampionChallenges
  },
  data: () => ({
    champSelect: null,
    isInChampSelect: null,
    myChampion: null,
    benchChampions: null,
    teammateChampions: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    await context.update()
    this.champSelect = context.champSelect

    if (!this.champSelect)
      return;

    this.isInChampSelect = !this.champSelect.hasOwnProperty("errorCode")

    if (!this.isInChampSelect)
      return;

    let me = this.champSelect.myTeam.find(teammate => teammate.puuid == context.summoner.puuid)
    let teammate = this.champSelect.myTeam.filter(teammate => teammate.puuid != context.summoner.puuid)
    let bench = this.champSelect.benchChampions

    this.myChampion = context.champions.find(c => c.id == me.championId)
    this.benchChampions = bench.map(b => context.champions.find(c => c.id == b.championId))
    this.teammateChampions = teammate.map(m => context.champions.find(c => c.id == m.championId))
  }
}

</script>

<template>
  <div>
    <div v-if="isInChampSelect">
      <h1>Mine</h1>
      <ChampionChallenges class="championChallenges" v-if="myChampion" :champion="myChampion" />

      <h1>Bench</h1>
      <ChampionChallenges class="championChallenges" v-if="benchChampions" v-for="champion in benchChampions"
        :champion="champion" />

      <h1>Teammate</h1>
      <ChampionChallenges class="championChallenges" v-if="teammateChampions" v-for="champion in teammateChampions"
        :champion="champion" />
    </div>
    <div v-else>You are not yet in champion select ! Please refresh if you are.</div>
  </div>
</template>

<style scoped>
.championChallenges {
  margin: 30px 10px;
}
</style>
