<script>

import Menu from './components/Menu.vue'

import Context from './Context'


export default {
  components: {
    Menu,
  },
  data: () => ({
    isMounted: false,
  }),
  async created() {
    let context = Context.getInstance()
    await context.updateOnce()
    this.isMounted = true
  },
}

</script>

<template>
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
