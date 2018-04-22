<template>
  <div>
    <player></player>
  </div>
</template>
<script>
import Player from '@/components/player/player'
import { mapMutations } from 'vuex'

export default {
  components: {
    Player
  },
  created () {
    this.setFullScreen(true)
  },
  destroyed () {
    this.setFullScreen(false)
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>
<style lang="stylus" scoped>
</style>
