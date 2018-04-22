<template>
  <div class="progress-bar" id="progressBar" 
     @click="progressClick">
    <div class="bar-inner">
      <div class="progress" id="progress"
      :style="{width: offsetWidth + 'px' }"
      ></div>
      <div class="progress-btn-wrapper" :style="{transform: 'translate3d( '+ offsetWidth + 'px,0,0)'}" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

const progressBtnWidth = 16

export default {
  data () {
    return {
      offsetWidth: '',
      widthPro: ''
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    progressTouchStart (e) {
      const touch = e.touches ? e.touches[0] : e['mp'].touches[0]
      this.touch.initiated = true
      this.touch.startX = touch.pageX
      this.touch.left = this.offsetWidth
    },
    progressTouchMove (e) {
      const touch = e.touches ? e.touches[0] : e['mp'].touches[0]
      if (!this.touch.initiated) {
        return
      }
      const deltaX = touch.pageX - this.touch.startX
      const offsetWidth = Math.min(this.widthPro - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    progressTouchEnd () {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick (e) {
      var query = wx.createSelectorQuery()
      var self = this
      query.select('#progressBar').boundingClientRect(function (rect) {
        const offsetWidth = e.pageX - rect.left
        self._offset(offsetWidth)
        self._triggerPercent()
      }).exec()
    },
    _triggerPercent () {
      const barWidth = this.widthPro - progressBtnWidth
      console.log(this.offsetWidth, 'offsetWidth')
      const percent = this.offsetWidth / barWidth
      this.$emit('percentChange', percent)
    },
    _offset (offsetWidth) {
      this.offsetWidth = offsetWidth
    }
  },
  watch: {
    percent (newPercent) {
      const self = this
      if (newPercent >= 0 && !this.touch.initiated) {
        var query = wx.createSelectorQuery()
        query.select('#progressBar').boundingClientRect(function (rect) {
          const barWidth = rect.width - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          self.widthPro = rect.width
          self._offset(offsetWidth)
        }).exec()
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: $color-aux-five
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-aux-three
          border-radius: 50%
          background: $color-theme
</style>