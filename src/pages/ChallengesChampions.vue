<script>
import { groupBy } from "lodash"

import ChampionChallenges from '../components/ChampionChallenges.vue'
import ChallengeCard from '../components/ChallengeCard.vue'
import ChallengeTooltip from '../components/ChallengeTooltip.vue'
import Champions from '../components/Champions.vue'
import Context from '../Context'

export default {
  components: {
    ChampionChallenges,
    ChallengeCard,
    ChallengeTooltip,
    Champions,
  },
  data: () => ({
    challenges: null,
    selectedChallenge: null,
    grouped_challenges: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    await context.update()

    this.challenges = context.challenges.filter(c =>
      c.idListType == "CHAMPION" &&
      c.capstoneGroupName != "Harmony" &&
      c.capstoneGroupName != "Globetrotter" &&
      c.retireTimestamp == 0
    );

    this.grouped_challenges = groupBy(this.challenges, (c) => c.parentId)

    console.log(this.challenges)

  }
}

</script>

<template>
  <div class="container">
    <div class="menu">
      <div v-for="challenges_ of  grouped_challenges ">
        <h4>
          {{ challenges_[0].parentName }}
        </h4>
        <table v-for="challenge of challenges_ "
          :class="[{ selected: challenge == selectedChallenge, not_selected: challenge != selectedChallenge }]">
          <tr class="row" @click="selectedChallenge = challenge">
            <td class="icon">
              <ChallengeTooltip :challenge="challenge" />
            </td>
            <td class="name">
              {{ challenge.name }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="selectedChallenge != null">
      <Champions class="champions" :champions="selectedChallenge.champions" />
    </div>
    <div v-else class="no_selection">
      Please select a challenge on the left.
    </div>
  </div>
</template>

<style scoped>
.menu {
  display: block;
  height: calc(100vh - 280px);
  overflow-y: scroll;
  width: 400px;
  float: left;
  overflow-x: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th:first-child,
td:first-child {
  width: 80px;
  /* Adjust the width as needed */
}

.selected {
  border-left: 3px solid white;
  margin-left: 3px;
}

.not_selected {
  margin-left: 6px;
}

.row {
  cursor: pointer;
  margin: 3px;
}

.row:hover {
  background-color: rgba(255, 255, 255, 0.11);
}

.name {
  padding: 10px;
  text-align: left;
}

.icon {
  padding: 5px;
}

.challengeCard {
  display: inline-block;
  margin-right: 20px;
}

.no_selection {
  margin: 30px;
  text-align: center;
  font-size: 1.5em;
}
</style>
