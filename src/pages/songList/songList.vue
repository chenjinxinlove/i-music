<template>
  <div class="songList">
    <div class="header">
      <div class="left">
        <img class="img" :src="personalized.picUrl" alt="" >
      </div>
      <div class="right">
        <div class="title">
          <icons></icons>
          <p>精品歌单</p>
          <icons></icons>
        </div>
        <p class="name">{{personalized.name}}</p>
        <p class="copywriter">{{personalized.copywriter}}</p>
      </div>
    </div>
    <div class="select-wrapper">
      <div class="select">{{selectValue}}</div>
      <div class="selectList">
        <span>华语</span>
        <span>摇滚</span>
        <span>影视原生</span>
      </div>
    </div>
  </div>
</template>
<script>
import {getPersonalizeds} from '../../api/songList'
import {HTTP_CODE} from '../../config'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      personalized: {},
      selectValue: '摇滚'
    }
  },
  created () {
    this._getPersonalizeds()
  },
  methods: {
    async _getPersonalizeds () {
      const data = await getPersonalizeds()
      const {code, result} = data

      if (code === HTTP_CODE) {
        this.personalized = result.shift()
        this.setPersinalizeds(result)
      }
    },
    ...mapMutations({
      'setPersinalizeds': 'SET_PERSONALIZEDS'
    })
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.songList
  .header
    padding 20px 20px 15px 10px
    display flex
    .left
      width 100px
      height 100px
      .img
        width 100%
        height 100%
    .right
      flex 1
      margin-left 10px
      color $color-aux-on
      line-height 2
      .title
        font-size $font-size-boid
      .name
        font-size $font-size-text
      .copywriter
        font-size $font-size-mix
        color $color-theme

</style>
