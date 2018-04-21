<template>
  <div class="songplay-wrapper" >
    <div class="songplay" v-if="bgImage">
      <img class="songImg" :src="bgImage" alt="">
      <div class="palyAll">
        <icons type='play3' size="24" color="#2ddae8"></icons>
      </div>
      <div class="info-wrapper">
        <div class="cd-wrapper">
          <div class="cd"></div>
        </div>
        <div class="name-wrapper">
          <p class="name">{{title}}</p>
          <p class="nickname">by:{{creatorname}}</p>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in songs" :key="item.id" @click="selectItem(item, index)">
          <span class="num">{{index + 1}}</span>
          <span class="name">{{item.name}}</span>
          <span class="artists">{{item.album}}</span>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import Icons from '@/components/icon/icon'
import { mapActions, mapGetters } from 'vuex'
import Loading from '@/components/loading/loading'
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    creatorname: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'playing'
    ])
  },
  components: {
    Icons,
    Loading
  },
  methods: {
    selectItem (item, index) {
      const playing = this.playing
      this.selectPlay({
        list: this.songs,
        index
      })
      if (!playing) {
        this.$router.push('../../pages/player/main')
      }
    },
    random () {
      this.randomPlay({
        list: this.songs
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
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
