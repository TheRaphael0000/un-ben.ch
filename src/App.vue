<script>

import Summoner from './components/Summoner.vue'
import Menu from './components/Menu.vue'

import Context from './Context'


export default {
  components: {
    Summoner,
    Menu,
  },
  data: () => ({
    summoner: null,
    isMounted: false,
  }),
  async created() {
    let context = Context.getInstance()
    await context.updateOnce()
    this.summoner = context.summoner
    this.isMounted = true
  },
}

</script>

<template>
  <Summoner v-if="summoner != undefined" :summoner="summoner" />

  <Menu />

  <router-view v-if="isMounted" v-slot="{ Component }">
    <transition name="transition" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
</template>

<style scoped>
.transition-enter-active,
.transition-leave-active {
  transition: opacity 0.3s, transform 0.1s;
}

.transition-enter-from,
.transition-leave-to {
  opacity: 0;
}
</style>
