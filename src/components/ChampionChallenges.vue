<script>

import ChallengeTooltip from './ChallengeTooltip.vue'
import Champion from './Champion.vue'
import Context from '../Context'


export default {
  props: ["champion"],
  components: {
    ChallengeTooltip,
    Champion,
  },
  data() {
    return {
      challenges: null,
    }
  },
  mounted() {
    let context = Context.getInstance()

    this.challenges = context.challenges.filter(c =>
      c.idListType == "CHAMPION" &&
      c.nextLevel != "" &&
      c.capstoneGroupName != "Harmony" &&
      c.capstoneGroupName != "Globetrotter" &&
      c.retireTimestamp == 0 &&
      !c.completedIds.includes(this.champion.id) &&
      (c.availableIds.includes(this.champion.id) || c.availableIds.length == 0)
    );

  },
}

</script>


<template>
  <div v-if="champion != undefined" class="container">
    <Champion class="champion" :champion="champion" />
    <div class="challenges">
      <ChallengeTooltip v-for="challenge of challenges" :challenge="challenge" />
    </div>
  </div>
</template>

<style scoped>
.champion {
  margin-right: 20px;
}

.container {
  display: flex;
}

.challenges {
  display: flex;
  flex-wrap: wrap;
}
</style>
