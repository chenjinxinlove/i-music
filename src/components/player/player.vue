<template>
  <div class="player-wrapper" v-show="playlist.length>0">

    <div class="player" v-if="fullScreen">
      <div class="song-name">{{currentSong.name}}</div>
      <div class="bg-box">
        <img class="img" :class="cdCls" :src="currentSong.image" alt="">
      </div>
      <div class="lyric">
        <div class="playing-lyric">{{playingLyric}}</div>
      </div>
      <div class="play-mode">
        <div>
          <icons type='collectGd' size="30" color="#b9b8bc"></icons>
        </div>
        <div @click="changeMode">
          <icons :type="iconMode" size="30" color="#b9b8bc"></icons> 
        </div>
           
      </div>
      <div class="progress-wrapper">
        
        <div class="progress-bar-wrapper">
          <progress-bar :percent="percent" @percentChange="onProgressBarChange" ></progress-bar>
        </div>
        <div class="time">
          <span class="time time-l">{{formatCurrentTime}}</span>
          <span class="time time-r">{{formatCurrentSongDuration}}</span>
        </div>
      </div>
      <div class="play-btn">
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
      <img class="img" :src="currentSong.image" :class="cdCls" alt="">
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
import {shuffle} from '../../common/js/utils'
import Lyric from 'lyric-parser'

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
      audioContext: '',
      formatCurrentTime: '',
      formatCurrentSongDuration: '',
      duration: ''
    }
  },
  created () {
    this.getLyric()
  },
  methods: {
    ready (audioContext) {
      this.audioContext = audioContext
      this.songReady = true
      setTimeout(() => {
        this.duration = audioContext.duration
        this.formatCurrentSongDuration = this.format(this.duration)
      }, 1000)
    },
    error () {
      this.songReady = true
    },
    updateTime (currentTime) {
      this.currentTime = currentTime
      this.formatCurrentTime = this.format(currentTime)
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
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    onProgressBarChange (percent) {
      const currentTime = this.duration * percent
      this.audioContext.seek(currentTime)
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    getLyric () {
      this.currentSong.getLyric().then((lyric) => {
        if (this.currentSong.lyric !== lyric) {
          return
        }
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      }).catch(() => {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLineNum = 0
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        // let lineEl = this.$refs.lyricLine[lineNum - 5]
        // this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        // this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
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
    iconMode () {
      return this.mode === playMode.sequence ? 'listCir' : this.mode === playMode.loop ? 'single' : 'random'
    },
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    percent () {
      return this.currentTime / this.duration
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
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        audio.play()
        this.getLyric()
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
<style  scoped>

.player-wrapper.data-v-151a1e06 {
  font-size: 32rpx;
}
.player-wrapper .player .song-name.data-v-151a1e06 {
  text-align: center;
  line-height: 1.5;
}
.player-wrapper .player .time.data-v-151a1e06 {
  display: flex;
  justify-content: space-between;
  color: #e8ecef;
  font-size: 24rpx;
}
.player-wrapper .player .bg-box.data-v-151a1e06 {
  margin: 60rpx auto;
  position: relative;
  display: flex;
  justify-content: center;
}
.player-wrapper .player .bg-box .img.data-v-151a1e06 {
  width: 420rpx;
  height: 420rpx;
  border-radius: 50%;
}
.player-wrapper .player .bg-box .bg-circel.data-v-151a1e06 {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -40rpx 0 0 -40rpx;
}
.player-wrapper .player .lyric.data-v-151a1e06 {
  text-align: center;
  height: 40rpx;
}
.player-wrapper .player .lyric .active.data-v-151a1e06 {
  font-weight: bold;
}
.player-wrapper .player .play-mode.data-v-151a1e06 {
  padding: 0 160rpx;
  display: flex;
  justify-content: space-around;
  margin: 40rpx 0;
}
.player-wrapper .player .progress-wrapper.data-v-151a1e06 {
  padding: 0 40rpx;
  height: 80rpx;
}
.player-wrapper .player .play-btn.data-v-151a1e06 {
  height: 240rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.player-wrapper .player .play-btn .play-circel.data-v-151a1e06 {
  height: 130rpx;
  width: 130rpx;
  border-radius: 50%;
  position: relative;
  background: #fff;
  box-shadow: 2rpx 2rpx 8rpx 10rpx #e8ecef;
  display: flex;
  justify-content: center;
  align-items: center;
}
.player-wrapper .mini-player.data-v-151a1e06 {
  height: 100rpx;
  display: flex;
  padding: 0 40rpx;
}
.player-wrapper .mini-player .img.data-v-151a1e06 {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 40rpx;
}
.player-wrapper .mini-player .middle .name.data-v-151a1e06 {
  line-height: 2;
  font-size: 28rpx;
  color: rgba(0,0,0,0.9);
}
.player-wrapper .mini-player .middle .album.data-v-151a1e06 {
  font-size: 24rpx;
  color: #b9b8bc;
}
.play.data-v-151a1e06 {
  animation: rotate-data-v-151a1e06 10s linear infinite;
}
.pause.data-v-151a1e06 {
  animation-play-state: paused;
}

@keyframes rotate-data-v-151a1e06 {
from {
    transform: rotate(0);
}
to {
    transform: rotate(360deg);
}
}
.progress-bar.data-v-29d852bd {
  height: 60rpx;
}
.progress-bar .bar-inner.data-v-29d852bd {
  position: relative;
  top: 26rpx;
  height: 8rpx;
  background: #e8ecef;
}
.progress-bar .bar-inner .progress.data-v-29d852bd {
  position: absolute;
  height: 100%;
  background: #2ddae8;
}
.progress-bar .bar-inner .progress-btn-wrapper.data-v-29d852bd {
  position: absolute;
  left: -16rpx;
  top: -26rpx;
  width: 60rpx;
  height: 60rpx;
}
.progress-bar .bar-inner .progress-btn-wrapper .progress-btn.data-v-29d852bd {
  position: relative;
  top: 14rpx;
  left: 14rpx;
  box-sizing: border-box;
  width: 32rpx;
  height: 32rpx;
  border: 6rpx solid #00b7f8;
  border-radius: 50%;
  background: #2ddae8;
}
.progress-circle.data-v-0925e17f {
  position: relative;
}
.progress-circle .svg.data-v-0925e17f {
  width: 64rpx;
  height: 64rpx;
}
.progress-circle circle.data-v-0925e17f {
  stroke-width: 16rpx;
  transform-origin: center;
}
.progress-circle circle.progress-bar.data-v-0925e17f {
  transform: scale(0.9) rotate(-90deg);
  stroke: #2ddae8;
}     
</style>
