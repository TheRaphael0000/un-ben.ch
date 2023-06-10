<script>
import Champion from './Champion.vue'

export default {
  props: ["champions"],
  components: {
    Champion,
  },
  data: () => ({
  }),
  mounted() {
  },
}

</script>


<template>
  <div class="champions">
    <template v-for="champion in champions">
      <Champion :champion="champion" />
    </template>
  </div>
</template>

<style scoped>
.champions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.selected {
  border: 3px solid yellow;
}
</style>
