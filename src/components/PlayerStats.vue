<script>
import _ from "lodash"
import Context from '../Context'

export default {
  props: ["player"],
  data() {
    return {
      context: null,
    }
  },
  async mounted() {
    this.context = Context.getInstance()
  },
}

</script>


<template>
  <div>
    <div>
      {{ player.profile.gameName }}#{{ player.profile.tagLine }}
    </div>
    <img class="profile_icon" :src="`${$DDP}/profileicon/${player.profile.profileIconId}.png`" />

    <div v-if="player.matches != undefined">
      <div v-for="game in player.matches.games.games"
        :class="{ game: true, win: game.participants[0].stats.win, lose: !game.participants[0].stats.win }"
        :set="stats = game.participants[0].stats">
        <img class="champion"
          :src="`${$DDP}/champion/${context?.championById(game.participants[0].championId).alias}.png`" />
        {{ stats.kills }} / {{ stats.deaths }} / {{
          stats.assists }}

        {{ game.gameMode }}
        {{ game.gameType }}
      </div>
      <!-- {{ player.matches }} -->
    </div>
    <div v-else>
      Matches are loading
    </div>

  </div>
</template>

<style scoped>
.profile_icon {
  width: 50px;
}

.game {}

.win {
  border: 2px solid green;
}

.lose {
  border: 2px solid red;
}

.champion {
  width: 50px;

}
</style>
