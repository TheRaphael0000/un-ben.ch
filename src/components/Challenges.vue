<script>
import Challenge from './Challenge.vue'

function group(data, key) {
  return data.reduce((group, d) => {
    const index = d[key];
    group[index] = group[index] ?? [];
    group[index].push(d);
    return group;
  }, {});
}

export default {
  props: ["challenges"],
  components: {
    Challenge,
  },
  data: () => ({
    challenges_: null,
  }),
  mounted() {
    let chall = Object.values(this.challenges)
    chall = chall.sort(c => c.currentLevel)
    this.challenges_ = group(chall, "category")
  },
}

</script>


<template>
  <template v-if="challenges_ != undefined" v-for="[category, category_challenges] of Object.entries(challenges_)  ">
    <h1>{{ category }}</h1>
    <div class="challenges">
      <template v-for="challenge in category_challenges">
        <Challenge :challenge="challenge" />
      </template>
    </div>
    <!-- <Challenge :challenge="challenge" /> -->
  </template>
</template>

<style scoped>
h1 {
  text-align: center;
}

.challenges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
