<template>
  <swiper :indicator-dots="indicatorDots"
          :autoplay="autoPlay"
          :interval="interval"
          :indicatorActiveColor="indicatorActiveColor"
          class="swiper-wraper"
  >
  <block :key="item.targetId" v-for="item in banners" >
    <swiper-item @click="onClick" class="slide-image-wrap">
      <image :src="item.pic" class="slide-image" />
    </swiper-item>
  </block>
</swiper>
</template>
<script>
export default {
  props: {
    banners: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    indicatorDots: {
      type: Boolean,
      default: false
    },
    indicatorActiveColor: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e)
    }
  }
}
</script>
<style lang="stylus" scoped>
.swiper-wraper
  height 176px
.slide-image-wrap
  height 176px
  .slide-image
    height 100%
    width 100%
</style>
