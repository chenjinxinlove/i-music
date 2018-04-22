<template>
  <div></div>
</template>
<script>
export default {
  data () {
    return {
      innerAudioContext: ''
    }
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initAudio()
  },
  watch: {
    src (newSrc, oldSrc) {
      if (newSrc === oldSrc) {
        return
      }
      this.innerAudioContext.destroy()
      this.initAudio()
    }
  },
  methods: {
    initAudio () {
      const innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext = innerAudioContext
      innerAudioContext.autoplay = true
      innerAudioContext.src = this.src
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        this.$emit('error')
      })
      innerAudioContext.onCanplay(() => {
        this.$emit('play', innerAudioContext)
      })
      innerAudioContext.onTimeUpdate((res) => {
        this.$emit('timeupdate', innerAudioContext.currentTime)
      })
      innerAudioContext.onEnded(() => {
        this.$emit('ended')
      })
      innerAudioContext.onSeeked((res) => {
        // 在跳到特定时间后，需要调用一下，不然
        innerAudioContext.currentTime
      })
    }
  }
}
</script>
