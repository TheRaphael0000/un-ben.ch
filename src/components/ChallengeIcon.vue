<script>

export default {
  props: ["challenge", "width"],
}

</script>


<template>
  <div>
    <template v-if="challenge.currentLevel == 'NONE'">
      <img class="img" :style="{ width: width }"
        :src="`${$DD}/challenges-images/${challenge.id}-${challenge.nextLevel}.png`" />
    </template>
    <template v-else>
      <img class="img" :style="{ width: width }"
        :src="`${$DD}/challenges-images/${challenge.id}-${challenge.currentLevel}.png`" />
    </template>
  </div>
</template>

<style scoped>
.img {
  width: 80px;
}
</style>
