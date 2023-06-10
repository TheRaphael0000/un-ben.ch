<script>

export default {
  props: ["champion"],
}

</script>


<template>
  <img class="champion" :src="`${$DDP}/champion/${champion.alias}.png`" />
</template>

<style scoped>
.champion {
  margin: 0;
  padding: 0;
  width: 80px;
  height: 80px;
}
</style>
