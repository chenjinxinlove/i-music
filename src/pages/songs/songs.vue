<template>
  <div class="songplay-wrapper" >
    <div class="songplay" v-if="playResult.coverImgUrl">
      <img class="songImg" :src="playResult.coverImgUrl" alt="">
      <div class="palyAll">
        <icons type='play3' size="24" color="#2ddae8"></icons>
      </div>
      <div class="info-wrapper">
        <div class="cd-wrapper">
          <div class="cd"></div>
        </div>
        <div class="name-wrapper">
          <p class="name">{{playResult.name}}</p>
          <p class="nickname">by:{{playResult.creator.nickname}}</p>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in playResult.tracks" :key="index">
          <span class="num">{{index + 1}}</span>
          <span class="name">{{item.name}}</span>
          <span class="artists">{{item.artists[0].name}}-{{item.album.name}}</span>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import { getSongPlay } from '../../api/songList'
import {HTTP_CODE} from '../../config'
import Icons from '@/components/icon/icon'
import { mapMutations } from 'vuex'
import Loading from '@/components/loading/loading'
export default {
  data () {
    return {
      id: '',
      type: '',
      playResult: {}
    }
  },
  beforeMount () {
    const {type, id} = this.$route.query
    this.type = type
    this.id = id
    this._getSongPlay(id)
  },
  components: {
    Icons,
    Loading
  },
  methods: {
    async _getSongPlay (id) {
      const data = await getSongPlay(id)
      const {code, result} = data
      if (code === HTTP_CODE) {
        this.playResult = result
        this.setSongPlay(result.tracks)
      }
    },
    ...mapMutations({
      'setSongPlay': 'SET_SONG_PLAY'
    })
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.songplay
  height 360px
  width 100%
  position relative
  .songImg
    width 100%
    height 100%
  .palyAll
    width 60px
    height 60px
    background $color-background
    border-radius 50%
    position absolute
    right 25px
    bottom -30px
    box-shadow -1px 1px 1px 1px $color-text-menu
    display flex
    justify-content center
    align-items center
.info-wrapper
  height 110px
  width 100%
  box-shadow -1px 1px 1px 0px $color-text-menu
  display flex
  align-items center
  .cd-wrapper
    width 60px
    height 60px
    border-radius 50%
    background #dde2ec
    border 1rpx solid #d3d9e6
    display flex
    justify-content center
    align-items center
    margin 0 20px
    .cd
      width 15px
      height 15px
      background #ffffff
      border-radius 50%
  .name-wrapper 
    flex 1
    .name
      line-height 1.5
      font-size $font-size-text
      overflow hidden
    .nickname
      font-size $font-size-mix
      color $color-text-menu
.list
  .item
    font-size $font-size-text
    height 40px
    line-height 40px
    display flex
    flex-wrap nowrap
    overflow hidden
    .num
      color $color-theme
      padding 0 10px
    .name
      padding 0 20px
    .artists
      font-size $font-size-mix 
      color $color-aux-one
      
      white-space: nowrap
</style>
