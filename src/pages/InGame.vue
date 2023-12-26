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
    queues: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    await context.updateGameflow()

    this.session = context.session
    this.queues = context.session.gameData.teamOne[0].ranked.queues.map(q => q.queueType)
    this.queue = this.queues[0]
  }
}

</script>

<template>
  <div>
    <div class="teams" v-if="session">
      <h1>{{ session.gameData.queue.detailedDescription }}

        <select v-model="queue" class="right">
          <option v-for="queue in queues" :value="queue">{{ queue }}</option>
        </select>
      </h1>

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
.teams {}

.team {
  display: flex;
  justify-content: center;

}

.player {}

.right {
  float: right;
}
</style>
