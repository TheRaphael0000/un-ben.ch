<script>
import _ from "lodash"

export default {
  props: ["player", "queue"],
  data() {
    return {
      tier: null,
      skinIndex: null,
      division: null,
      lp: null,
    }
  },
  async mounted() {
    const queueData = this.player.ranked.queueMap[this.queue]
    this.tier = _.upperFirst(_.toLower(queueData.tier))
    this.division = queueData.division
    this.lp = queueData.leaguePoints
    if (this.tier == "") {
      this.tier = "Provisional"
      this.division = ""
      this.lp = ""
    }
    this.skinIndex = this?.player?.selection?.selectedSkinIndex ?? 0
    console.log(this.player)
  }
}

</script>


<template>
  <div class="container">
    <img class="background" :src="`${$DD}/champion/loading/${player.champion.alias}_${this.skinIndex}.jpg`" />
    <div class="content">
      <img class="tier" :src="`${$DDP}/tft-regalia/TFT_Regalia_${this.tier}.png`" />
      {{ this.tier }} {{ this.division }} {{ this.lp }} LP
      <h3>
        {{ player.summonerInternalName }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  text-align: center;
  color: white;
}

.background {
  width: 300px;
  display: block;
  opacity: 0.6;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.8);
}

.content .tier {
  width: 300px;
}
</style>
