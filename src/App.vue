<script>
// import CurrentSummoner from './components/CurrentSummoner.vue'


export default {
  data: () => ({
    summoner: null,
    champions: null,
    masteries: null,
    challenges: null,
    championChallenges: null,
    DDP: `src/static/dragontail-13.11.1/13.11.1/img`,
    DD: `src/static/dragontail-13.11.1/img`
  }),

  created() {
    this.fetchData().then(() => {
    })


  },
  mounted: () => {

  },
  methods: {
    async fetchData() {
      this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)

      this.challenges = await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`)
      this.championChallenges = Object.values(this.challenges).filter(c => c.idListType == "CHAMPION" && c.category != "TEAMWORK")
      console.log(this.championChallenges)

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
  <div v-if="this.summoner != undefined">
    <h1>
      <img class="profileIcon" :src="`${this.DDP}/profileicon/${this.summoner.profileIconId}.png`" />
      {{ this.summoner.displayName }} - lvl. {{ this.summoner.summonerLevel }}
    </h1>
  </div>
  <!-- <code>{{ this.summoner }}</code> -->
  <div class="challenges">
    <template v-for="challenge in championChallenges">
      <div class="challenge">
        <div>{{ challenge.name }}</div>
        <p>{{ challenge.description }}</p>
        <!-- <code>{{ challenge }}</code> -->
        <!-- <div>{{ challenge.name }}</div> -->
        <div v-if="challenge.currentLevel == 'NONE'">
          <img class="challenge_img locked"
            :src="`${this.DD}/challenges-images/${challenge.id}-${challenge.nextLevel}.png`" />
        </div>
        <div v-else>
          <img class="challenge_img"
            :src="`${this.DD}/challenges-images/${challenge.id}-${challenge.currentLevel}.png`" />
        </div>
        <!-- <span v-if="champion.mastery != undefined">{{ champion.mastery.championLevel }}</span> -->
      </div>
    </template>
  </div>
  <div class="champions">
    <template v-for="champion in champions">
      <img class="champion" :src="`${this.DDP}/champion/${champion.alias}.png`" />
      <!-- <span v-if="champion.mastery != undefined">{{ champion.mastery.championLevel }}</span> -->
    </template>
  </div>
  <!-- <CurrentSummoner greetingMessage="a" /> -->
  <!-- <Champions /> -->
  <!-- <button>Load</button> -->
</template>

<style>
.champions,
.challenges {
  display: flex;
  flex-wrap: wrap;
}

.champion {
  margin: 0;
  padding: 0;
  width: 80px
}

.challenge {
  width: 200px
}

.profileIcon {
  width: 50px
}

.challenge_img {
  width: 50px
}

.locked {
  opacity: 0.4;
}

.selected {
  border: 3px solid yellow;
}
</style>
