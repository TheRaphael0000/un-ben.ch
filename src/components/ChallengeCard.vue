<script>

import ChallengeIcon from './ChallengeIcon.vue'

export default {
  props: ["challenge"],
  components: {
    ChallengeIcon,
  },
}

</script>


<template>
  <!-- <code>{{ challenge }}</code> -->
  <div>
    <div class="challengeCardContainer" :class="{ locked: challenge.currentLevel == 'NONE' }">
      <ChallengeIcon class="icon" :challenge="challenge" />
      <div class="progress" v-if="challenge.nextThreshold != 0">
        <span class="progressText">{{ challenge.currentValue }} / {{ challenge.nextThreshold }}</span>
        <progress class="progressBar" :value="challenge.currentValue" :max="challenge.nextThreshold"></progress>
      </div>
      <div class="name">{{ challenge.name }}</div>
      <div class="description">{{ challenge.description }}</div>
      <div class="links">
        <router-link :to="`/FriendsChallenge/${challenge.id}`">Friends</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.challengeCardContainer {
  margin: 2px;
  padding: 5px;
  width: 13em;
  height: 16em;
  text-align: center;
  border: 2px solid grey;
  overflow-y: auto;
}

.icon {
  padding: 10px;
}

.container::-webkit-scrollbar {
  width: 4px;
}

.container::-webkit-scrollbar-thumb {
  background-color: white;
}


.name {
  font-weight: bold;

}

.locked {
  opacity: 0.6;
}


.description {
  padding: 3px;
  font-size: 0.8em;
}

.progress {
  position: relative;
  margin-top: 10px;
}

.progressBar {
  margin: 5px;
  width: 120px;
  display: inline-block;
}

.progressText {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -70%);
}
</style>
