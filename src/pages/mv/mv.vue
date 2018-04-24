<template>
<div class="mv-wrappepr">
  <div class="rem-mv">
    <div class="title">推荐MV</div>
    <div class="list">
      <div class="item" v-for="item in remmvs" :key="item.id" @click="player(item.id)">
        <img class="img" :src="item.picUrl" alt="">
        <div class="playCount">{{item.playCount}}</div>
        <div class="name">{{item.name}}</div>
        <div class="artistName">{{item.artistName}}</div>
      </div>
    </div>
  </div>
  <div class="rank">
    <div class="title">最新MV</div>
    <div class="list">
      <div class="item" v-for="item in newmvs" :key="item.id" @click="player(item.id)">
        <img :src="item.cover" alt="" class="img">
        <div class="playCount">{{item.playCount}}</div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {getRemMv, getNewMV} from '../../api/mv'
import {HTTP_CODE} from '../../config'

export default {
  data () {
    return {
      remmvs: [],
      newmvs: []
    }
  },
  created () {
    this._getRemMv()
    this._getNewMV()
  },
  methods: {
    async _getRemMv () {
      const {code, result} = await getRemMv()
      if (code === HTTP_CODE) {
        this.remmvs = result
      }
    },
    async _getNewMV () {
      const {code, data} = await getNewMV()
      if (code === HTTP_CODE) {
        this.newmvs = data
      }
    },
    player (id) {
      this.$router.push('../../pages/mv-plyer/main?id=' + id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.mv-wrappepr
  .rem-mv
    padding 20px 5px 20px 5px
    .title
      font-size 16px
      font-weight bold
      line-height 2
      margin-bottom 5px
    .list
      display flex
      flex-wrap wrap
      justify-content space-between
      .item
        width 49%
        position relative
        line-height 1.5
        .img
          border-radius 2px
          height 100px
          width 100%
        .playCount
          position absolute
          right 5px
          top 5px
          font-size 12px
          color #fff
        .name
          font-size 12px
          color #1f1f1fs
        .artistName
          font-size 12px
          color #b9b8bc
  .rank
    .title
      padding-left 5px
      font-size 16px
      font-weight bold
      line-height 2
      margin-bottom 5px
    .item
      position relative
      .img
        display block
        width 100%
        height 220px
      .playCount
          position absolute
          left 5px
          top 5px
          font-size 12px
          color #fff
        .name
          font-size 14px
          color #1f1f1fs
          line-height 40px
</style>