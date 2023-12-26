<script>

import Context from '../Context'

export default {
  components: {
  },
  data: () => ({
    challenges: null,
  }),
  async mounted() {
    let context = Context.getInstance()
  }
}

</script>

<template>
  <div>
    <img src="https://127.0.0.1:29107/lol-game-data/assets/v1/champion-splashes/233/233000.jpg" />
  </div>
</template>

<style scoped></style>
