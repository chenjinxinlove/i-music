<template>
  <div></div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  mounted () {
    console.log(this.src, 'src')
    const innerAudioContext = wx.createInnerAudioContext()
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
    innerAudioContext.onTimeUpdate(() => {
      this.$emit('timeupdate', innerAudioContext.currentTime)
    })
    innerAudioContext.onEnded(() => {
      this.$emit('ended')
    })
  }
}
</script>
