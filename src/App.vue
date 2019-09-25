<template>
  <div id="app" class="app">
    <router-view></router-view>
    <bottom v-show="navShow"></bottom>
  </div>
</template>

<script>
import bottom from '@/bottom/bottom'
export default {
  name: 'app',
  computed: {
    navShow() {
      return !this.$route.meta.navShow
    }
  },
  components: {
    bottom
  }
}
</script>

<style lang="stylus" scoped>
</style>

