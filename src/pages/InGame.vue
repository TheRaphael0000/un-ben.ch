<script>

import PlayerCard from '../components/PlayerCard.vue'
import Context from '../Context'

export default {
  components: {
    PlayerCard,
  },
  data: () => ({
    session: null,
    queue: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    await context.updateGameflow()

    this.session = context.session
    console.log(this.session)
    this.queue = "RANKED_SOLO_5x5"
  }
}

</script>

<template>
  <div>
    <h1>In Game</h1>
    <div v-if="session">
      <div class="team">
        <PlayerCard class="player" :player="player" :queue="queue" v-for="player in session.gameData.teamOne" />
      </div>

      <div class="team">
        <PlayerCard :player="player" :queue="queue" v-for="player in session.gameData.teamTwo" />
      </div>
    </div>
    <div v-else>
      You are not in game, try refreshing
    </div>
  </div>
</template>

<style scoped>
.team {
  display: flex;
}

.player {}
</style>
