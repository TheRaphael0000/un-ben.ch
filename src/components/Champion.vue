<script>

export default {
  props: ["champion"],
}

</script>


<template>
  <div :class='["championContainer", { is_dim: !champion.is_completed, is_fade: !champion.is_available }]'>
    <img class="champion" :src="`${$DDP}/champion/${champion.alias}.png`" />
    <div :class='["mastery_level", "mastery_level_" + champion?.mastery?.championLevel]'>
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


.mastery_level {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1em;
  font-weight: bold;
  margin: 3px 3px;
  opacity: 0.9;
  pointer-events: none;
  padding: 0px 6px;
  background-color: #22222296;
  border-radius: 50% 0 0 0;
}

.mastery_level_7 {
  background-color: #1C8C8C96;
}

.mastery_level_6 {
  background-color: #8C1C8796;
}

.mastery_level_5 {
  background-color: #8C201C96;
}


.champion {
  margin: 0;
  padding: 0;
  width: 60px;
  height: 60px;
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

.is_dim {
  opacity: 0.3;
}

.is_fade {
  opacity: 0.1;
}
</style>
