<template>
  <div class="container">
    <div class="header">
      
      <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches> 
      <icon type='search' size="12"></icon>
    </div>
  </div> 
</template>

<script>
import Switches from '@/components/switches/switches'
import Icon from '@/components/icon/icon'
export default {
  data () {
    return {
      switches: [ {'name': '推荐'}, {'name': '乐圈'}, {'name': '我的'} ],
      currentIndex: 0
    }
  },

  components: {
    Switches,
    Icon
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

</style>
