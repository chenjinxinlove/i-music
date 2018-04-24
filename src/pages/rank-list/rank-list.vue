<template>
<div>
  <div v-if="!loading">
    <div class='listheader'>云音乐官方榜</div>
    <div class='flex-boxlist flex sortlist'>
      <div v-for="item in sort.list" :key="item.id" v-if="item.ToplistType" @click="skip(item.id)">
        <div class="flexlist">
          <div class="cover flexleft">
            <image class="album_cover" :src="item.coverImgUrl + '?param=200y200'" />
          </div>
          <div class="flexl tl_info">
            <div class="sort_fl_list " v-for="(r, idx) in item.tracks" :key="idx">
              {{idx+1}}．{{r.first}} - {{r.second}}
            </div>
          </div>
        </div>
      </div>
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
    </div>
    <div class='listheader'>全球榜</div>
    <div class='flex-boxlist'>
      <div class="tl_cnt" v-for="item in sort.list" :key="item.id" v-if="!item.ToplistType">
        <a class="wraper">
          <div class="quanqiu">
            <image :src="item.coverImgUrl + '?param=200y200'" class="img_qu" />
          </div>
          <text class="text">{{item.name}}</text>
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
import {mock} from '../../api/rank'
import Loading from '@/components/loading/loading'
export default {
  data: {
    sort: mock,
    loading: false
  },
  components: {
    Loading
  },
  created () {
    // this._getRankList()
  },
  methods: {
    // async _getRankList () {
    //   const res = await getRankList()
    //   this.sort = res.data
    //   this.loading = false
    // }
    skip (id) {
      this.$router.push('../../pages/songs-details/main?id =' + id)
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
  width 5px
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
    height 95px
    padding  0
    flex  0 0 115px
    margin 5px 10px 5px 5px
  .tl_info
    font-size 13px
    line-height 1.6
    .tli_des
      color #888
      font-size 24rpx
.sort_fl_list
  flex 0 0 100%
  line-height 2
.album_cover 
  background-size:cover
  width:100px
  height:90px
  vertical-align:middle
  position:relative
  z-index:1
.tl_cnt
  width:231.3rpx
  margin:15rpx 0 15rpx 15rpx
  box-sizing:border-box
  line-height:1.2
  
.quanqiu
  width 100px
  height 100px
  .img_qu
    height 100%
    width 100%
.text
  font-size 12px
  color #ccc 
</style>  