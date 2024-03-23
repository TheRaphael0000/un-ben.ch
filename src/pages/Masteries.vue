<script>

import Context from '../Context'

export default {
  components: {
  },
  data: () => ({
    champions: null,
    catalog_skins: null,
    catalog_chromas: null,
    owned_skins: null,
    owned_chromas: null,
  }),
  async mounted() {
    this.champions = Context.getInstance().champions
    this.catalog_skins = Context.getInstance().catalog_skins
    this.catalog_chromas = Context.getInstance().catalog_chromas
    this.owned_skins = Context.getInstance().owned_skins
    this.owned_chromas = Context.getInstance().owned_chromas
  },
  methods: {
    sortList(sortBy) {
      this.champions.sort((x, y) => (sortBy(x) > sortBy(y) ? -1 : 1));
    }
  },
}

</script>

<template>
  <div>
    <table class="sortable">
      <th colspan="2" class="left" @click="sortList(c => c.name)">
        Champion name
      </th>
      <th class="right" @click="sortList(c => c?.mastery?.championPoints ?? 0)">
        Points
      </th>
      <th class="center"
        @click="sortList(c => c?.mastery?.championPoints ?? 0); sortList(c => c?.mastery?.tokensEarned ?? 0); sortList(c => c?.mastery?.championLevel ?? 0)">
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
      <th class="left" @click="sortList(c => c?.owned_skins?.length ?? 0)">
        Skins<br>{{ owned_skins?.length }} / {{ catalog_skins?.length }}
      </th>
      <th class="left" @click="sortList(c => c?.owned_chromas?.length ?? 0)">
        Chromas<br>{{ owned_chromas?.length }} / {{ catalog_chromas?.length }}
      </th>

      <th class="right" @click="sortList(c => -c?.ranked_data?.average_stats?.rank ?? 0)">
        Rank
      </th>
      <th class="right" @click="sortList(c => c?.ranked_data?.average_stats?.win_rate ?? 0)">
        Winrate
      </th>

      <template v-for="champion of champions">
        <tr v-if="champion.mastery != null" :set="mastery = champion.mastery"
          :class='["mastery_level", "mastery_level_" + champion?.mastery?.championLevel]'>
          <td class="left">
            <img class="champion" :src="`${$DDP}/champion/${champion.alias}.png`" />
          </td>
          <td class="left">
            {{ champion.name }}
          </td>
          <td class="right">
            {{ mastery.championPoints.toLocaleString() }}
          </td>
          <td class="center">
            <span class="right m">
              {{ mastery.championLevel }}
            </span>
            <span
              :set="tokens = (mastery.championLevel >= 6 ? 2 : 0) + (mastery.championLevel >= 7 ? 3 : 0) + mastery.tokensEarned">
              <progress id="mastery" :value="mastery.championPoints" :max="21600" width="100px">
              </progress>
              <input type="checkbox" :checked="tokens >= 1" />
              <input type="checkbox" :checked="tokens >= 2" />
              <input type="checkbox" :checked="tokens >= 3" />
              <input type="checkbox" :checked="tokens >= 4" />
              <input type="checkbox" :checked="tokens >= 5" />
            </span>
            <span class="right m w" :set="need = 21600 - mastery.championPoints">
              <span v-if="need > 0">{{ need.toLocaleString() }}</span>
              <span v-else>{{ (0).toLocaleString() }}</span>
            </span>
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
            {{ champion?.owned_skins?.length ?? 0 }} / {{ champion?.catalog_skins?.length ?? 0 }}
          </td>
          <td>
            {{ champion?.owned_chromas?.length ?? 0 }} / {{ champion?.catalog_chromas?.length ?? 0 }}
          </td>
          <td class="right">
            {{ champion?.ranked_data?.average_stats?.rank ?? 0 }}
          </td>
          <td class="right">
            {{ (champion?.ranked_data?.average_stats?.win_rate * 100).toFixed(2) ?? 0 }} %
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

.m {
  margin: 0px 15px;
}

.w {
  display: inline-block;
  width: 50px;
}
</style>
