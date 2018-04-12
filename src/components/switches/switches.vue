<template>
  <ul class="switches">
    <li :key="index" class="switch-item" v-for="(item, index) in switches" :class="{'active': currentIndex === index}" @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.switches
  display flex
  align-items center
  justify-content center
  font-size $font-size-body-menu
  color $color-text-menu
  .switch-item
    width 50px
    line-height 1.5
    padding-bottom 10px
    margin 0 10px
    text-align center
    border-bottom 1px solid rgba(0, 0, 0, 0)
  .active
    color $color-theme
    border-bottom 1px solid $color-theme
</style>
