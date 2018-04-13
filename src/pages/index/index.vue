<template>
  <div class="container">
    <div class="header">
      <icons type='list2' size="16" color="#b9b8bc"></icons>
      <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches> 
      <icons type='search' size="16" color="#b9b8bc"></icons>
    </div>
    <div class="content">
      <sliders
          :indicatorDots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :banners="banners"
          v-show="banners.length"
          @onClick="onClickSlider"
      ></sliders>
      <div class="nav">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </div>
  </div> 
</template>

<script>
import {getBanner} from '../../api/banner'
import {HTTP_CODE} from '../../config'

import Switches from '@/components/switches/switches'
import Icons from '@/components/icon/icon'
import Sliders from '@/components/slider/slider'
export default {
  data () {
    return {
      switches: [ {'name': '推荐'}, {'name': '乐圈'}, {'name': '我的'} ],
      currentIndex: 0,
      banners: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000
    }
  },

  components: {
    Switches,
    Icons,
    Sliders
  },

  methods: {
    switchItem (index) {
      this.currentIndex = index
    },
    onClickSlider (e) {
      console.log(e)
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
.header
  width 100%
  box-sizing border-box
  display flex
  justify-content space-between
  padding 0 20px
.icon-list2
  position relative
  top 2px
.content
  width 100%
  .nav
    width 100%

</style>
