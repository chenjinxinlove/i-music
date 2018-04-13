<template>
  <div class="container">
    <div class="header">
      <icons type='list2' size="16" color="#b9b8bc"></icons>
      <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches> 
      <icons type='search' size="16" color="#b9b8bc"></icons>
    </div>
  </div> 
</template>

<script>
import Switches from '@/components/switches/switches'
import Icons from '@/components/icon/icon'
export default {
  data () {
    return {
      switches: [ {'name': '推荐'}, {'name': '乐圈'}, {'name': '我的'} ],
      currentIndex: 0
    }
  },

  components: {
    Switches,
    Icons
  },

  methods: {
    switchItem (index) {
      this.currentIndex = index
    }
  },

  created () {
  }
}
</script>

<style lang="stylus" scoped>
.header
  width 100%
  box-sizing border-box
  display flex
  justify-content space-between
  padding 0 20px
.icon-list2
  position relative
  top 2px

</style>
