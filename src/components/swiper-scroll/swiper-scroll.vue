<template>
<div class="scroll-container">
  <div class="scroll-view">
    <div 
        @touchstart.prevent="handlerStart"
        @touchmove.prevent="handlerMove"
        @touchend="handlerEnd"
        @touchcancel="handlecancel"
        class="scroll-view-wrapper"
        :class="{withAnimate: !initiated}"
        :style="{left: -offset + 'px'}"
    >   
    <view :style="{width: windowWidth + 'px'}"  class="one-scene">
        <scroll-view style="height:100%" scroll-y>
          <div :style="{width: windowWidth + 'px'}">
            <slot name="recommend"></slot>
          </div>
        </scroll-view>
      </view>
      <view :style="{width: windowWidth + 'px'}"  class="one-scene">
        <scroll-view style="height:100%" scroll-y>
          <div class="hei1" :style="{width: windowWidth + 'px'}">111</div>
        </scroll-view>
      </view>
      <view :style="{width: windowWidth + 'px'}"  class="one-scene">
        <scroll-view style="height:100%" scroll-y>
          <div class="hei2" :style="{width: windowWidth + 'px'}">3</div>
        </scroll-view>
      </view>
       
    </div>
  </div>
</div>

</template>
<script>
export default {
  data () {
    return {
      offset: 0,
      initiated: false,
      windowWidth: ''
    }
  },
  props: {
    tabsCount: {
      type: Number,
      default: 3
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
    try {
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth
    } catch (e) {
      console.log(new Error(e))
    }
  },
  methods: {
    handlerStart (e) {
      this.initiated = true
      const touch = e.touches ? e.touches[0] : e['mp'].touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
      this.touch.tapStartTime = e.timeStamp
      this.touch.offsetCatch = this.offset
    },
    handlerMove (e) {
      if (!this.initiated) {
        return
      }
      const touch = e.touches ? e.touches[0] : e['mp'].touches[0]
      let {clientX} = touch
      const deltaX = this.touch.startX - clientX
      let offset = this.offset
      // const deltaY = clientY - this.touch.startY
      // if (Math.abs(deltaY) > Math.abs(deltaX)) {
      //   return
      // }
      offset = this.touch.offsetCatch + deltaX
      if (offset <= 0) {
        offset = 0
      }
      if (offset >= this.windowWidth * (this.tabsCount - 1)) {
        offset = this.windowWidth * (this.tabsCount - 1)
      }
      this.offset = offset
    },
    handlecancel () {
      console.log('d')
      let offset = this.offset
      if (this.offset % this.windowWidth >= (this.windowWidth / 2)) {
        offset = (this.currentIndex + 1)
      } else {
        offset = (this.currentIndex)
      }
      if (offset <= 0) {
        offset = 0
      }
      if (offset >= this.windowWidth * (this.tabsCount - 1)) {
        offset = this.windowWidth * (this.tabsCount - 1)
      }
      this.offset = offset
      this.initiated = false
    },
    handlerEnd (e) {
      console.log('ddd')
      const changedTouches = e.changedTouches ? e.changedTouches[0] : e['mp'].changedTouches[0]
      let {clientX, clientY} = changedTouches
      let endTime = e.timeStamp
      let offset = this.offset
      let {startX, tapStartTime} = this.touch
      // 快速滑动
      let currentIndex = this.currentIndex
      if (endTime - tapStartTime <= 300) {
        // 向左
        if (Math.abs(startX - clientY) < 50) {
          if (startX - clientX > 5) {
            if (currentIndex < this.tabsCount - 1) {
              currentIndex++
            }
          } else {
            if (currentIndex > 0) {
              --currentIndex
            }
          }
          this.$emit('updateIndex', currentIndex)
          offset = this.windowWidth * currentIndex
        } else {
          // 快速滑动 但是Y距离大于50 所以用户是左右滚动
          let page = Math.round(this.offset / this.windowWidth)
          if (currentIndex !== page) {
            currentIndex = page
          }
          this.$emit('updateIndex', currentIndex)
          offset = this.windowWidth * page
        }
      } else {
        let page = Math.round(this.offset / this.windowWidth)
        if (currentIndex !== page) {
          currentIndex = page
        }
        this.$emit('updateIndex', currentIndex)
        offset = this.windowWidth * page
      }
      if (offset <= 0) {
        offset = 0
      }
      if (offset >= this.windowWidth * (this.tabsCount - 1)) {
        offset = this.windowWidth * (this.tabsCount - 1)
      }
      this.offset = offset
      this.initiated = false
    }
  }

}
</script>

<style lang="stylus" scoped>
.scroll-container
  position: fixed
  top:33px;
  left:0;
  right:0;
  bottom:0;
.hei
  height 800px
  background red
.hei1
  height 2000px
  background #000000
.hei2
  height 600px
  background yellow
.withAnimate 
  transition: all 100ms ease;
  -webkit-transform: translate3d(0, 0, 0)
  -moz-transform: translate3d(0, 0, 0)
  -ms-transform: translate3d(0, 0, 0)
  transform: translate3d(0, 0, 0)
  -webkit-backface-visibility: hidden
  -moz-backface-visibility: hidden
  -ms-backface-visibility: hidden
  backface-visibility: hidden
  -webkit-perspective: 1000
  -moz-perspective: 1000
  -ms-perspective: 1000
  perspective: 1000
.scroll-view 
  position: relative
  width: 100%
  height: 100%
  .scroll-view-wrapper 
    position: absolute
    top: 0;
    bottom: 0;
    display: flex
</style>
