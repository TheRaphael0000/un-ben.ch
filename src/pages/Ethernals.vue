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

  }
}

</script>

<template>
  <div>
  </div>
</template>

<style scoped></style>
