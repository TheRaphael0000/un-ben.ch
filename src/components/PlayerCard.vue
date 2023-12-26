<script>
import _ from "lodash"

export default {
  props: ["player", "queue"],
  data() {
    return {
      skinIndex: null,
    }
  },
  computed: {
    queueData() {
      return this.player.ranked.queueMap[this.queue]
    },
    tier() {
      return _.upperFirst(_.toLower(this.queueData.tier))
    },
    division() {
      return this.queueData.division
    },
    lp() {
      return this.queueData.leaguePoints
    },
  },
  async mounted() {
    console.log(this.player)
    // if (this.tier == "") {
    //   this.tier = ""
    //   this.division = ""
    //   this.lp = ""
    // }
    // this.skinIndex = this?.player?.selection?.selectedSkinIndex ?? 0
  }
}

</script>


<template>
  <div :class="{ container: true, current: player.current }">
    <img class="background" :src="`${$DD}/champion/loading/${player.champion.alias}_0.jpg`" />
    <div class="content">
      <h3 class="name">
        {{ player.summonerInternalName }}
      </h3>
      <div v-if="this.tier != ''">
        <img class="tier" :src="`${$DDP}/tft-regalia/TFT_Regalia_${this.tier}.png`" />
        <div>
          {{ this.tier }} {{ this.division }}
        </div>
        <div>
          {{ this.lp }} LP
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current {
  border: 3px solid rgba(255, 255, 0, 0.2);
  margin: 2px !important;
}

.container {
  position: relative;
  width: 200px;
  text-align: center;
  color: white;
  margin: 5px;
}

.background {
  width: 200px;
  display: block;
  opacity: 0.6;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.8);
}

.content .tier {
  width: 200px;
}
</style>
