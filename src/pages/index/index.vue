<template>
  <div class="container">
    <div class="header">
      <icons type='list2' size="16" color="#b9b8bc"></icons>
      <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches> 
      <icons type='search' size="16" color="#b9b8bc"></icons>
    </div>
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
                <!-- slot recommend -->
                <div id="recommend" class="content">
                  <sliders
                      :indicatorDots="indicatorDots"
                      :autoplay="autoplay"
                      :interval="interval"
                      :banners="banners"
                      v-show="banners.length"
                      @onClick="onClickSlider"
                  ></sliders>
                  <div class="nav">
                    <ul class="ul">
                      <li class="li">
                        <a href="../../pages/recommend-list/main">
                          <img class="img-item" src="http://objheplwd.bkt.clouddn.com/music.svg" alt="">
                          <span>歌单</span>
                        </a>
                      </li>
                      <li >
                        <a class="li" href="../../pages/day/main">
                          <img class="img-item" src="http://objheplwd.bkt.clouddn.com/heart%20.svg" alt="">
                          <span>每日推荐</span>
                        </a>
                      </li>
                      <li>
                        <a class="li" href="../../pages/rank-list/main">
                          <img class="img-item" src="http://objheplwd.bkt.clouddn.com/task.svg" alt="">
                          <span>排行榜</span>
                        </a>
                      </li>
                      <li>
                        <a class="li" href="../../pages/mv/main">
                          <img class="img-item" src="http://objheplwd.bkt.clouddn.com/piano.svg" alt="">
                          <span>MV</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="music-wraper new-music">
                    <div class="title">
                      <span>最新音乐</span>
                      <icons type='right' size="14" color="#b9b8bc"></icons>
                    </div>
                    <div class="content">
                      <div class="new-music-item" v-for="item in newMusics" :key="item.id">
                        <img :src="item.picUrl" alt="" class="img">
                        <p class="name">{{item.name}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="music-wraper">
                    <div class="title">
                      <span>音乐推荐</span>
                      <icons type='right' size="14" color="#b9b8bc"></icons>
                    </div>
                    <div class="content">
                      
                    </div>
                  </div>
                  <div class="music-wraper">
                    <div class="title">
                      <span>热门歌星</span>
                      <icons type='right' size="14" color="#b9b8bc"></icons>
                    </div>
                    <div class="content">

                    </div>
                  </div>
                </div>
                <!-- slot recommend -->
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

    <!-- 等待mpvue更好的支持slot <swiper-scroll :currentIndex="currentIndex" @updateIndex="updateIndex"> -->
      
    <!-- </swiper-scroll> -->
  </div> 
</template>

<script>
import {getBanner, getNewMusics} from '../../api/index'
import {HTTP_CODE} from '../../config'

import Switches from '@/components/switches/switches'
import Icons from '@/components/icon/icon'
import Sliders from '@/components/slider/slider'
// import SwiperScroll from '@/components/swiper-scroll/swiper-scroll'

export default {
  data () {
    return {
      switches: [ {'name': '推荐'}, {'name': '乐圈'}, {'name': '我的'} ],
      currentIndex: 0,
      banners: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      toView: 'recommend',
      offset: 0,
      initiated: false,
      windowWidth: '',
      tabsCount: 3,
      newMusics: []
    }
  },

  components: {
    Switches,
    Icons,
    Sliders
    // SwiperScrollß
  },

  methods: {
    onScrollView (e) {
      // let {scrollLeft} = e.target

      console.log(e)
    },
    switchItem (index) {
      const ids = ['recommend', 'share', 'my']
      this.toView = ids[index]
      this.currentIndex = index
      this._scrollCurrentIndex()
    },
    onClickSlider (e) {
      console.log(e)
    },
    updateIndex (index) {
      this.currentIndex = index
    },
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
      const changedTouches = e.changedTouches ? e.changedTouches[0] : e['mp'].changedTouches[0]
      let {clientX, clientY} = changedTouches
      let endTime = e.timeStamp
      let offset = this.offset
      let {startX, tapStartTime} = this.touch
      let currentIndex = this.currentIndex
      if (endTime - tapStartTime <= 300) {
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
          // this.$emit('updateIndex', currentIndex)
          this.currentIndex = currentIndex
          offset = this.windowWidth * currentIndex
        } else {
          let page = Math.round(this.offset / this.windowWidth)
          if (currentIndex !== page) {
            currentIndex = page
          }
          this.currentIndex = currentIndex
          // this.$emit('updateIndex', currentIndex)
          offset = this.windowWidth * page
        }
      } else {
        let page = Math.round(this.offset / this.windowWidth)
        if (currentIndex !== page) {
          currentIndex = page
        }
        this.currentIndex = currentIndex
        // this.$emit('updateIndex', currentIndex)
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
    },
    async _getBanbar () {
      const data = await getBanner()
      const {code, banners} = data

      if (code === HTTP_CODE) {
        this.banners = banners
      }
    },
    async _getNewMusics () {
      const data = await getNewMusics()
      const {code, albums} = data

      if (code === HTTP_CODE) {
        this.newMusics = albums
      }
    },
    _scrollCurrentIndex () {
      this.touch.initiated = true
      this.offset = this.currentIndex * this.windowWidth
    }
  },

  created () {
    this._getBanbar()
    this._getNewMusics()
    this.touch = {}
    try {
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth
    } catch (e) {
      console.log(new Error(e))
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.header
  width 100%
  box-sizing border-box
  display flex
  justify-content space-between
  padding 0 20px
  background  $color-background
.icon-list2
  position relative
  top 2px
.content
  width 100%
  display inline-block
  background: #f8f8f8;
  .nav
    width 100%
    font-size $font-size-mix
    background  $color-background
    .ul
      display flex
      justify-content space-around
      align-items center
      color $color-text
      .li
        height 110px
        display flex
        align-items center
        justify-content center
        flex-direction column
        .img-item
          display block
          height 30px
          width 25px      
  .music-wraper
    background $color-background
    padding 15px
    .title
      display flex
      justify-content space-between
      align-items center 
  .new-music
    margin-top 15px
    .content
      display flex
      justify-content space-between
      padding-top 20px
      background #fff
      .img
        width 100px
        height 100px
      .name
        font-size 14px
        text-align center  
.scroll-container
  position: fixed
  top:33px;
  left:0;
  right:0;
  bottom:0;
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
