<template>
<div>
  <div v-if="!loading">
    <div class='listheader'>云音乐官方榜</div>
    <div class='flex-boxlist flex sortlist'>
      <a v-for="item in sort.list" :key="item.id" v-if="item.ToplistType">
        <div class="flexlist">
          <div class="cover flexleft">
            <image class="album_cover" :src="item.coverImgUrl + '?param=200y200'" />
            <text>{{item.updateFrequency}}</text>
          </div>
          <div class="flexl tl_info">
            <div class="sort_fl_list " v-for="(r, idx) in item.tracks" :key="idx">
              {{idx+1}}．{{r.first}} - {{r.second}}
            </div>
          </div>
        </div>
      </a>
      <a >
        <div class=" flexlist ">
          <div class="cover flexleft">
            <image class="album_cover" :src="sort.artistToplist.coverUrl" />
          </div>
          <div class="flexl tl_info">
            <div class="sort_fl_list " v-for="(item, idx) in sort.artistToplist.artists" :key="idx">
              {{idx+1}}．{{item.first}} -
              <text>{{item.third}}</text>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class='listheader'>全球榜</div>
    <div class='flex-boxlist'>
      <div class="tl_cnt" v-for="item in sort.list" :key="item.id" v-if="!item.ToplistType">
        <a>
          <div class="cover flexleft">
            <image :src="item.coverImgUrl + '?param=200y200'" class="album_cover" />
            <text>{{item.updateFrequency}}</text>
          </div>
          <text>{{item.name}}</text>
        </a>
      </div>
    </div>
  </div>
  <div v-else>
    <loading></loading>
  </div>
</div>  
</template>
<script>
import {getRankList} from '../../api/rank'
import Loading from '@/components/loading/loading'
export default {
  data: {
    sort: [],
    loading: true
  },
  components: {
    Loading
  },
  created () {
    this._getRankList()
  },
  methods: {
    async _getRankList () {
      const res = await getRankList()
      this.sort = res.data
      this.loading = false
    }
  }
}
</script>
<style lang="stylus">
.listheader
  margin 12px 7px 5px
  overflow hidden
.listheader:before
  display inline-block
  width 5rpx
  background-color red
  height .8em
  content ""
  vertical-align middle
  margin-right 7px
  border-radius 5px
.flex-boxlist
  overflow hidden
  display flex
  flex-wrap wrap
.flexlist
  display flex
  .flexl
    flex 1
    padding 5px 5px 5px 0
    margin 0
    align-items center
    margin-left 0
    box-sizing border-box
    overflow hidden
    line-height 1.5
    position relative
    border-bottom 1rpx solid #e1e2e3
    align-items stretch
  .flexleft
    padding-right 5px
  .cover
    width 115px
    height 115px
    padding  0
    flex  0 0 115px
    margin 5px 10px 5px 5px
  .album_cover
    width 100%
    height 100%
    position absolute
    top 0
    left 0
  .tl_info
    font-size 13px
    line-height 1.6
    view
      word-break keep-all
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .tli_des
      color #888
      font-size 24rpx
.sort_fl_list
  flex 0 0 100%
  line-height 2