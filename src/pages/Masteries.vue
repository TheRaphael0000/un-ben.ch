<script>

import Context from '../Context'

export default {
  components: {
  },
  data: () => ({
    champions: null,
  }),
  async mounted() {
    this.champions = Context.getInstance().champions
  }
}

</script>

<template>
  <div>
    <table>
      <td class="left">
        #
      </td>
      <th colspan="2" class="left">
        Champion name
      </th>
      <th class="right">
        Level
      </th>
      <th class="right">
        Points
      </th>
      <th class="center" colspan="2">
        Progress
      </th>
      <th class="center">
        Chest
      </th>
      <!-- <th class="left">
        Max
      </th>
      <th class="left">
        Last played
      </th> -->
      <th class="left">
        Skins
      </th>
      <template v-for="champion of champions">
        <tr v-if="champion.mastery != null" :set="mastery = champion.mastery"
          :class='["mastery_level", "mastery_level_" + champion?.mastery?.championLevel]'>
          <td class="left">

          </td>
          <td class="left">
            <img class="champion" :src="`${$DDP}/champion/${champion.alias}.png`" />
          </td>
          <td class="left">
            {{ champion.name }}
          </td>
          <td class="right">
            {{ mastery.championLevel }}
          </td>
          <td class="right">
            {{ mastery.championPoints.toLocaleString() }}
          </td>
          <td class="center tight-columns">
            <div
              :set="tokens = (mastery.championLevel >= 6 ? 2 : 0) + (mastery.championLevel >= 7 ? 3 : 0) + mastery.tokensEarned">
              <progress id="mastery" :value="mastery.championPoints" :max="21600">
              </progress>
              <input type="checkbox" :checked="tokens >= 1" />
              <input type="checkbox" :checked="tokens >= 2" />
              <input type="checkbox" :checked="tokens >= 3" />
              <input type="checkbox" :checked="tokens >= 4" />
              <input type="checkbox" :checked="tokens >= 5" />
            </div>
          </td>
          <td class="right tight-columns" :set="need = 21600 - mastery.championPoints">
            <span v-if="need > 0">{{ need.toLocaleString() }}</span>
            <span v-else>{{ (0).toLocaleString() }}</span>
          </td>
          <td class="center">
            <input type="checkbox" :checked="mastery.chestGranted" />
          </td>
          <!-- <td class="left">
            {{ mastery.highestGrade }}
          </td> -->
          <!-- <td :set="date = new Date(mastery.lastPlayTime)">
            {{ date.toLocaleDateString() }} {{ date.toLocaleTimeString() }}
          </td> -->
          <td>
            {{ champion?.skins?.length ?? 0 }}
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

.champion {
  width: 30px;
}
</style>
