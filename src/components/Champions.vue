<script>
import Champion from './Champion.vue'

export default {
  props: ["champions"],
  components: {
    Champion,
  },
}

</script>


<template>
  <div class="champions">
    <template v-for="champion in champions">
      <Champion :champion="champion" v-if="champion.is_available" :class='[{ is_dim: !champion.is_completed }]' />
    </template>
  </div>
</template>

<style scoped>
.champions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}


.is_dim {
  opacity: 0.3;
}
</style>
