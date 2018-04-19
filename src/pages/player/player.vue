<template>
  <div class="player-wrapper">
    <div class="player" v-show="false">
      <div class="song-name">Dance</div>
      <div class="bg-box">
        <div class="bg-circel"></div>
        <img class="img" src="http://p1.music.126.net/CaGP87OM2b_3nHlkgwOvgw==/7904389092767864.jpg" alt="">
      </div>
      <div class="lyric">
        <p class="active">if im  a boy shan hua</p> 
        <p>instant crush</p> 
      </div>
      <div class="play-mode">
        <icons type='random' size="30" color="#b9b8bc"></icons>
        <icons type='collectGd' size="30" color="#b9b8bc"></icons>  
        <icons type='single' size="30" color="#b9b8bc"></icons>    
      </div>
      <div class="progress-wrapper">
        <progress-bar></progress-bar>
      </div>
      <div class="play">
        <icons type='backward2' size="40" color="#2ddae8"></icons>
        <div class="play-circel">
          <icons type='pause2' size="30" color="#2ddae8"></icons>
        </div>
        <icons type='forward3' size="40" color="#2ddae8"></icons>
      </div>
    </div>
    <div class="mini-player">
      <img class="img" src="http://p1.music.126.net/CaGP87OM2b_3nHlkgwOvgw==/7904389092767864.jpg" alt="">
      <div class="middle">
        <p class="name">如果我是陈奕迅</p>
        <p class="album">mr-宇宙爆炸专辑</p>
      </div>
      <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
      </progress-circle>
    </div>

  </div>
</template>
<script>
import Icons from '@/components/icon/icon'
import ProgressBar from '@/components/progress-bar/progress-bar'
import ProgressCircle from '@/components/progress-circle/progress-circle'
export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: ''
    }
  },
  components: {
    Icons,
    ProgressBar,
    ProgressCircle
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.player-wrapper
  font-size 16px
  .player
    .song-name
      text-align center
      line-height 1.5
    .bg-box
      margin 30px auto
      position relative
      display flex
      justify-content center
      .img
        width 210px
        height 210px
        border-radius 50%
      .bg-circel
        width 40px
        height 40px
        border-radius 50%
        background #fff
        position absolute
        top 50%
        left 50%
        margin -20px 0 0 -20px
    .lyric
      text-align center
      .active
        font-weight bold
    .play-mode
      padding 0 80px
      display flex
      justify-content space-around
      margin  20px 0
    .progress-wrapper
      padding 0 20px 
      height 40px
    .play
      height 120px
      display flex
      justify-content space-around
      align-items center
      .play-circel
        height 65px
        width 65px
        border-radius 50%
        position relative
        background #fff
        box-shadow  1px 1px 4px 5px $color-aux-five
        display flex
        justify-content center
        align-items center
</style>
