<script>

import ChallengeCard from './ChallengeCard.vue'
import ChallengeIcon from './ChallengeIcon.vue'

export default {
  props: ["challenge", "width"],
  components: {
    ChallengeCard,
    ChallengeIcon,
  },
}

</script>


<template>
  <!-- <code>{{ challenge }}</code> -->
  <div class="container tooltip">
    <ChallengeIcon :challenge="challenge" />
    <ChallengeCard class="tooltipData" :challenge="challenge" />
  </div>
</template>

<style scoped>
.container {
  display: wrap;
  flex-wrap: wrap;
  justify-content: center;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltipData {
  visibility: hidden;
  background-color: rgba(22, 22, 22, 0.8);
  position: absolute;
  opacity: 1;
  top: -14px;
  z-index: 1;
  pointer-events: none;
}

.tooltip:hover .tooltipData {
  visibility: visible;
}
</style>
