<script>

import Context from '../Context'

export default {
  components: {
  },
  data: () => ({
    lobby: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    this.lobby = context.lobby
    console.log(this.lobby)
  }
}

</script>

<template>
  <div>
  </div>
</template>

<style scoped></style>
