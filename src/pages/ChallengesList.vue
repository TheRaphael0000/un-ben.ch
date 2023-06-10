<script>

import Challenges from '../components/Challenges.vue'
import Context from '../Context'


export default {
  components: {
    Challenges,
  },
  data: () => ({
    challenges: null,
  }),
  async mounted() {
    let data = Context.getInstance()
    await data.update()
    this.challenges = data.challenges
  },
}

</script>

<template>
  <div>
    <Challenges v-if="challenges != undefined" :challenges="challenges" />
  </div>
</template>

<style scoped></style>
