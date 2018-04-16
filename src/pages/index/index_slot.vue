<template>
  <div class="container">
    <div class="header">
      <icons type='list2' size="16" color="#b9b8bc"></icons>
      <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches> 
      <icons type='search' size="16" color="#b9b8bc"></icons>
    </div>
    <swiper-scroll :currentIndex="currentIndex" @updateIndex="updateIndex">
      <div slot="recommend">
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
              <img class="img-item" src="http://objheplwd.bkt.clouddn.com/music.svg" alt="">
              <span>歌单</span>
            </li>
            <li class="li">
              <img class="img-item" src="http://objheplwd.bkt.clouddn.com/heart%20.svg" alt="">
              <span>每日推荐</span>
            </li>
            <li class="li">
              <img class="img-item" src="http://objheplwd.bkt.clouddn.com/task.svg" alt="">
              <span>排行榜</span>
            </li>
            <li class="li">
              <img class="img-item" src="http://objheplwd.bkt.clouddn.com/piano.svg" alt="">
              <span>MV</span>
            </li>
          </ul>
        </div>
        <div class="music-wraper new-music">
          <div class="title">
            <span>最新音乐</span>
            <icons type='list2' size="16" color="#b9b8bc"></icons>
          </div>
          <div class="content">

          </div>
        </div>
        <div class="music-wraper">
          <div class="title">
            <span>音乐推荐</span>
            <icons type='list2' size="16" color="#b9b8bc"></icons>
          </div>
          <div class="content">

          </div>
        </div>
        <div class="music-wraper">
          <div class="title">
            <span>热门歌星</span>
            <icons type='list2' size="16" color="#b9b8bc"></icons>
          </div>
          <div class="content">

          </div>
        </div>
      </div>
    </swiper-scroll>
  </div> 
</template>

<script>
import {getBanner} from '../../api/banner'
import {HTTP_CODE} from '../../config'

import Switches from '@/components/switches/switches'
import Icons from '@/components/icon/icon'
import Sliders from '@/components/slider/slider'
import SwiperScroll from '@/components/swiper-scroll/swiper-scroll'

export default {
  data () {
    return {
      switches: [ {'name': '推荐'}, {'name': '乐圈'}, {'name': '我的'} ],
      currentIndex: 0,
      banners: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      toView: 'recommend'
    }
  },

  components: {
    Switches,
    Icons,
    Sliders,
    SwiperScroll
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
    },
    onClickSlider (e) {
      console.log(e)
    },
    updateIndex (index) {
      this.currentIndex = index
    },
    async _getBanbar () {
      const data = await getBanner()
      const {code, banners} = data

      if (code === HTTP_CODE) {
        this.banners = banners
      }
    }
  },

  created () {
    this._getBanbar()
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
</style>
