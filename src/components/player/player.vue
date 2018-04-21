<template>
  <div class="player-wrapper" v-show="playlist.length>0">

    <div class="player" v-if="fullScreen">
      <div class="song-name">{{currentSong.name}}</div>
      <div class="bg-box">
        <img class="img" :src="currentSong.image" alt="">
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
        <div @click="prev">
          <icons type='backward2' size="40" color="#2ddae8" ></icons>
        </div>
        <div class="play-circel" @click="togglePlaying">
          <icons :type="playIcon" size="30" color="#2ddae8"></icons>
        </div>
        <div @click="next">
          <icons type='forward3' size="40" color="#2ddae8"></icons>
        </div>
      </div>
    </div>

    <div class="mini-player" v-else>
      <img class="img" :src="currentSong.image" alt="">
      <div class="middle">
        <p class="name">{{currentSong.name}}</p>
        <p class="album">{{currentSong.album}}</p>
      </div>
      <progress-circle :radius="radius" :percent="percent">
          <icons type='pause2' size="30" color="#2ddae8"></icons>
      </progress-circle>
    </div>
    <audio :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Icons from '@/components/icon/icon'
import ProgressBar from '@/components/progress-bar/progress-bar'
import ProgressCircle from '@/components/progress-circle/progress-circle'
import Audio from '@/components/audio/audio'
import {playMode} from '../../config/index'

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: '',
      audioContext: ''
    }
  },
  methods: {
    ready (audioContext) {
      this.audioContext = audioContext
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    updateTime (currentTime) {
      this.currentTime = currentTime
    },
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      const audio = this.audioContext
      audio.currentTime = 0
      audio.play()
      this.setPlayingState(true)
    },
    next () {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    prev () {
      console.log('prev')
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  computed: {
    playIcon () {
      return this.playing ? 'pause2' : 'play3'
    },
    ...mapGetters([
      'playlist',
      'currentIndex',
      'fullScreen',
      'playing',
      'currentSong',
      'sequenceList',
      'mode'
    ])
  },
  watch: {
    playing (newPlaying) {
      const audio = this.audioContext
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    },
    currentSong (newSong, oldSong) {
      const audio = this.audioContext
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      newSong.getSongUrl()
      // newSong.getLyric()
      // if (this.currentLyric) {
      //   this.currentLyric.stop()
      //   this.currentTime = 0
      //   this.playingLyric = ''
      //   this.currentLineNum = 0
      // }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        audio.play()
      }, 1000)
    }
  },
  components: {
    Icons,
    ProgressBar,
    ProgressCircle,
    Audio
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
  .mini-player
    height 50px
    display flex
    padding 0 20px
    .img
      width 50px
      height 50px
      border-radius 50% 
      margin-right 20px
    .middle
      .name
        line-height 2
        font-size $font-size-text
        color $color-text
      .album
        font-size $font-size-mix
        color $color-text-menu
</style>
