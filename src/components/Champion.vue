<script>

export default {
  props: ["champion"],
}

</script>


<template>
  <div class="championContainer">
    <img class="champion" :src="`${$DDP}/champion/${champion.alias}.png`" />
    <div class="mastery">
      <template v-if="champion.mastery != undefined">
        {{ champion.mastery.championLevel }}
      </template>
      <template v-else>0</template>
    </div>
    <div class="name">
      {{ champion.name }}
    </div>
  </div>
</template>

<style scoped>
.championContainer {
  position: relative;
}

.mastery {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2px 6px;
  margin: -2px;
  background-color: rgba(22, 22, 22, 0.9);
  /* background-color: yellow; */
  border-radius: 50% 0 0 0;
}


.champion {
  margin: 0;
  padding: 0;
  width: 80px;
  height: 80px;
}

.championContainer .name {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  background-color: black;
  padding: 2px 8px;
  background-color: rgba(22, 22, 22, 0.9);
  transform: translate(-50%, 0);
  pointer-events: none;
}

.championContainer:hover .name {
  visibility: visible;
}
</style>
