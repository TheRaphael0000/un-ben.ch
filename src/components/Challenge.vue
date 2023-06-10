<script>


export default {
  props: ["challenge"],
  created() {
  },
}

</script>


<template>
  <!-- <code>{{ challenge }}</code> -->
  <div class="container" :class="{ locked: challenge.currentLevel == 'NONE' }">
    <template v-if="challenge.currentLevel == 'NONE'">
      <img class="img" :src="`${$DD}/challenges-images/${challenge.id}-${challenge.nextLevel}.png`" />
    </template>
    <template v-else>
      <img class="img" :src="`${$DD}/challenges-images/${challenge.id}-${challenge.currentLevel}.png`" />
    </template>
    <div class="progress" v-if="challenge.nextThreshold != 0">
      <span class="progressText">{{ challenge.currentValue }} / {{ challenge.nextThreshold }}</span>
      <progress class="progressBar" :value="challenge.currentValue" :max="challenge.nextThreshold"></progress>
    </div>
    <div class="name">{{ challenge.name }}</div>
    <div class="description">{{ challenge.description }}</div>
  </div>
</template>

<style scoped>
.container {
  margin: 2px;
  padding: 5px;
  width: 235px;
  height: 260px;
  text-align: center;
  border: 2px solid grey;
  overflow-y: auto;
}

.container::-webkit-scrollbar {
  width: 4px;
}

.container::-webkit-scrollbar-thumb {
  background-color: white;
}

.img {
  width: 80px;
  padding: 5px;
}

.name {
  font-weight: bold;

}

.locked {
  opacity: 0.6;
}


.description {
  padding: 3px;
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
