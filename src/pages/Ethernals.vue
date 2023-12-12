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
      c.capstoneGroupId == "501000" &&
      c.idListType == "CHAMPION"
    );
    console.log(this.challenges)
  }
}

</script>

<template>
  <div>
    <div class="container" v-for="challenge of challenges">
      <!-- <code>{{ challenge }}</code> -->
      <ChallengeCard class="challengeCard" :challenge="challenge" />
      <Champions class="champions" :champions="challenge.champions" />
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
