<template>
  <div class="songList">
    <div class="blur header-wrapper" :style="headerImgBg"></div>
    <div class="header">
      <div class="left">
        <img class="img" :src="personalized.picUrl" alt="" >
      </div>
      <div class="right">
        <div class="title">
          <icons></icons>
          <p>精品歌单</p>
          <icons type='right' size="16" color="#b9b8bc"></icons>
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
import Icons from '@/components/icon/icon'

export default {
  data () {
    return {
      personalized: {},
      selectValue: '摇滚',
      headerImgBg: ''
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
        const personalized = result.shift()
        this.personalized = personalized
        this.headerImgBg = `background:url(${personalized.picUrl}) center`
        this.setPersinalizeds(result)
      }
    },
    ...mapMutations({
      'setPersinalizeds': 'SET_PERSONALIZEDS'
    })
  },
  components: {
    Icons
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.blur    
  filter blur(5px)
  opacity 0.5
.songList
  .header-wrapper
    position relative
    height 125px
  .header
    position absolute
    top 0
    padding 20px 20px 15px 10px
    display flex
    .left
      width 100px
      height 100px
      .img
        width 100%
        height 100%
    .right
      margin-left 10px
      color $color-aux-on
      line-height 2
      .title
        display flex
        align-items center
        font-size $font-size-boid
      .name
        font-size $font-size-text
      .copywriter
        font-size $font-size-mix
        color $color-theme
        line-height 1.5
</style>
