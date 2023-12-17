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
    challenge: null,
    grouped_challenges: null,
  }),
  async mounted() {
    let context = Context.getInstance()

    this.challenges = context.challenges.filter(c =>
      c.idListType == "CHAMPION" &&
      c.capstoneGroupName != "Harmony" &&
      c.capstoneGroupName != "Globetrotter" &&
      c.retireTimestamp == 0
    );

    this.grouped_challenges = groupBy(this.challenges, (c) => c.parentId)

    console.log(context.challenges)
    console.log(context.friends)

  }
}

</script>

<template>
  <div class="container">
    <div class="left_side">
      <div v-for="challenges_ of  grouped_challenges ">
        <h4>
          {{ challenges_[0].parentName }}
        </h4>
        <div v-for="challenge_ of challenges_ "
          :class="[{ selected: challenge_ == challenge, not_selected: challenge_ != challenge }]">
          <div class="row" @click="challenge = challenge_">
            <img class="challenge_icon"
              :src="`${$DD}/challenges-images/${challenge_.id}-${challenge_.currentLevel}.png`" />
            <div class="name">
              {{ challenge_.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right_side" v-if="challenge != null">
      <div class="title">
        <h1>
          {{ challenge.capstoneGroupName }} / {{ challenge.name }}
        </h1>
        <h4>
          {{ challenge.description }}
        </h4>
      </div>
      <Champions class="champions" :champions="challenge.champions" />
    </div>
    <div v-else class="no_selection">
      Please select a challenge on the left.
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.left_side {
  display: block;
  flex: 0 0 340px;
  height: calc(100vh - 245px);
  overflow-y: scroll;
}

.right_side {
  flex: 1;
  padding: 10px;
}

.selected {
  border-left: 3px solid white;
  margin-left: 3px;
}

.not_selected {
  margin-left: 6px;
}

.row {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 3px;
}

.row:hover {
  background-color: rgba(255, 255, 255, 0.11);
}

.title {
  /* text-align: center; */
}

.name {
  padding: 10px;
  text-align: left;
}

.challenge_icon {
  height: 60px;
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
