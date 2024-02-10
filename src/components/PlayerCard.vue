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
      return _.upperFirst(_.toLower(this.queueData?.tier))
    },
    division() {
      return this.queueData?.division
    },
    lp() {
      let lp = this.queueData?.leaguePoints
      // if (lp == "NA")
      //   return ""
      return lp
    },
  },
  async mounted() {
    // console.log(this.player)
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
  <div class="container">
    <img class="background" :src="`${$DD}/champion/loading/${player.champion.alias}_0.jpg`" />
    <div class="content">
      <div class="larger">
        {{ player.champion.alias }}
      </div>
      <div>
        {{ player.profile.gameName }}#{{ player.profile.tagLine
        }}
      </div>
      <div>
        Level {{ player.profile.summonerLevel }}
      </div>
      <template v-if="this.tier != ''">
        <img class="tier" :src="`${$DDP}/tft-regalia/TFT_Regalia_${this.tier}.png`" />
        <div>
          {{ this.tier }} {{ this.division }}
        </div>
        <div>
          {{ this.lp }} LP
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
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
  opacity: 0.8;
}

.content {
  position: absolute;
  display: inline;
  padding: 10px;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  font-size: smaller;
  font-weight: bold;
}

.content>div {
  display: table;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.content .tier {
  width: 180px;
}
</style>
