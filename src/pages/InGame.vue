<script>

import PlayerCard from '../components/PlayerCard.vue'
import PlayerStats from '../components/PlayerStats.vue'
import Context from '../Context'

export default {
  components: {
    PlayerCard,
    PlayerStats,
  },
  data: () => ({
    session: null,
    queue: null,
    queues: null,
    selected_player: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    await context.updateGameflow()
    this.session = context.session
    this.queues = context.session.gameData.teamOne[0]?.ranked?.queues?.map(q => q.queueType)
    if (this.queues != undefined)
      this.queue = "RANKED_SOLO_5x5"
    await context.updateMatches()
    console.log(this.session)
  }
}

</script>

<template>
  <div>
    <div class="container" v-if="session">
      <div>
        <h1>
          {{ session.gameData.queue.detailedDescription || session.gameData.queue.description }}
          <select v-model="queue" class="f-right">
            <option v-for="queue in queues" :value="queue">{{ queue }}</option>
          </select>
        </h1>

        <div class="team">
          <PlayerCard :player="player" :queue="queue" v-for="player in session.gameData.teamOne"
            @click="selected_player = player" :class="{ selected: player == selected_player }" />
        </div>

        <div class="team">
          <PlayerCard :player="player" :queue="queue" v-for="player in session.gameData.teamTwo"
            @click="selected_player = player" :class="{ selected: player == selected_player }" />
        </div>
      </div>
      <PlayerStats :player="selected_player" v-if="selected_player != undefined" />
    </div>
    <div v-else>
      You are not in game, try refreshing
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.team {
  display: flex;
  justify-content: center;

}

.selected {
  border: 3px solid rgba(255, 255, 0, 0.6);
  margin: 2px !important;
}
</style>
