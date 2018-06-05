<template>
<div class="new-wrapper">
  <div v-for="item in newMusics" :key="item.id">
    <div class="new-music-item">
      <img :src="item.picUrl" alt="" class="img"> 
    </div>
    <p class="name">{{item.name}}</p>
  </div>
  
</div>
</template>

<script>
import {getNewMusics} from '../../api/index'
import {HTTP_CODE} from '../../config'

export default {
  data () {
    return {
      newMusics: []
    }
  },
  created () {
    this._getNewMusics()
  },
  methods: {
    async _getNewMusics () {
      const data = await getNewMusics(20)
      const {code, albums} = data

      if (code === HTTP_CODE) {
        this.newMusics = albums
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.new-wrapper
  overflow hidden
  display flex
  flex-wrap wrap
  .new-music-item
    width 176px
    height 155px
    box-sizing border-box
    margin 7px 0 7px 7px
    line-height 1.2
    background url('http://zky.koocdn.com/club/picture/e24204f81a484204afcb9cd2a5fd33a9.png') center no-repeat
    background-size cover
    display flex
    justify-content flex-start
    align-items center
    .img
      width 86%
      height 96%
  .name
    width 176px
    font-size 13px
    text-align center
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
