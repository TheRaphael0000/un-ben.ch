<script>

import ChampionChallenges from '../components/ChampionChallenges.vue'
import ChallengeCard from '../components/ChallengeCard.vue'
import ChallengeIcon from '../components/ChallengeIcon.vue'
import Champions from '../components/Champions.vue'
import Context from '../Context'

export default {
  components: {
    ChampionChallenges,
    ChallengeCard,
    ChallengeIcon,
    Champions,
  },
  data: () => ({
    challenges: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    await context.update()

    this.challenges = context.challenges.filter(c =>
      c.idListType == "CHAMPION" &&
      c.nextLevel != "" &&
      c.capstoneGroupName != "Harmony" &&
      c.capstoneGroupName != "Globetrotter" &&
      c.retireTimestamp == 0
    );

    console.log(this.challenges)
    for (let challenge of this.challenges) {
      let champs = []

      let allIds = context.champions.map(c => c.id)
      let negativeIds = challenge.completedIds
      let positiveIds = challenge.availableIds

      if (positiveIds.length <= 0)
        champs = allIds.filter(x => !negativeIds.includes(x)).map(id => context.champions.find(c => c.id == id))
      else
        champs = positiveIds.filter(x => !negativeIds.includes(x)).map(id => context.champions.find(c => c.id == id))

      challenge["champions"] = champs
    }

    this.challenges = this.challenges.filter(c => c.champions.length > 0)

    this.challenges.sort((a, b) => -(a.currentValue - b.currentValue))
  }
}

</script>

<template>
  <div>
    <div class="container" v-for="challenge of challenges">
      <!-- <code>{{ challenge }}</code> -->
      <div>
        <ChallengeCard class="challengeCard" :challenge="challenge" />
      </div>
      <div>
        <Champions class="champions" :champions="challenge.champions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  border-bottom: 1px solid white;
  margin: 10px;
  padding: 10px;
}

.challengeCard {
  display: inline-block;
  margin-right: 20px;
}
</style>
