<script>

export default {
  props: ["summoner"],
  created() {
  }
}

</script>


<template>
  <!-- {{ summoner }} -->
  <table>
    <tr>
      <td>
        <div class="profile">
          <!-- <span class="level">{{ summoner.summonerLevel }}</span> -->
          <img class="profileIcon" :src="`${$DDP}/profileicon/${summoner.profileIconId}.png`" />
        </div>
        <!-- <td>
        <progress class="xpProgress" :value="summoner.xpSinceLastLevel"
          :max="summoner.xpUntilNextLevel + summoner.xpSinceLastLevel"></progress>
      </td> -->
      </td>
      <td class="name">
        {{ summoner.displayName }}
      </td>
    </tr>
    <tr>
    </tr>
    <tr>
    </tr>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  min-height: 110px;
}

td,
tr {
  padding: 0;
  margin: 0;
}

.name {
  padding: 10px;
  font-size: 4em;
  font-weight: lighter;
}

.profile {
  position: relative;
}

.line {
  display: inline;
}

.profileIcon {
  margin: 10px;
  min-height: 60px;
  min-width: 60px;
  max-height: 60px;
  max-width: 60px;
  display: block;
  border: 4px solid white;
  padding: 4px;
  border-radius: 50%;
}

.level {
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
}

.xpProgress {
  width: 74px;
}
</style>
