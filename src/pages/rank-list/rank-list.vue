<template>
<div>
  <div class="tab_cnt" v-if="!loading">
    <div class='listheader'>云音乐官方榜</div>
    <div class='flex-boxlist flex sortlist'>
      <a v-for="item in sort.list" :key="item.id" v-if="item.ToplistType">
        <div class="flexlist">
          <div class="cover flexleft fl-image">
            <image class="album_cover" :src="item.coverImgUrl + '?param=200y200'" />
            <text>{{item.updateFrequency}}</text>
          </div>
          <div class="flexlist tl_info">
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
          <div class="flexlist tl_info">
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
<style >
.flexlist .cover{width:230rpx;height:230rpx;padding: 0;flex: 0 0 230rpx;margin:10rpx 20rpx 10rpx 10rpx;}
.sort_fl_list{flex: 0 0 100%;line-height: 2}
.sortlist .flexlist{flex-flow: wrap; align-content: center;}
.tl_cnt{width: 231.3rpx;margin:15rpx 0 15rpx 15rpx;box-sizing: border-box;line-height: 1.2;}
.flex-two .tl_cnt{width: 352.5rpx}
.tl_cnt text{font-size: 26rpx;color: #666;}
.tl_cnt .cover .mv_cover,.tl_cnt .cover .music_cover,.cover .album_cover,.cover .def_cover{width: 100%;height: 100%;position: absolute;top:0;left:0}
.cover{position: relative;height: 0;padding-top: 100%;overflow: hidden;margin-bottom: 10rpx;}
.alist_bg{background: none !important}
.cover .img_creator{position: absolute;right: 0;bottom:0;line-height: 32rpx;color: #fff;
z-index: 2;width: 100%;padding:40rpx 10rpx 10rpx;font-size: 24rpx; box-sizing: border-box; background-image: linear-gradient(rgba(255,255,255,0),rgba(0,0,0,.2));overflow: hidden;white-space:nowrap;text-overflow: ellipsis}
.cover .img_creator image{margin: 0 5rpx;}
.tl_cnt .name{line-height: 1.4;overflow: hidden; word-break: break-all;display: block;max-height: 2.8em;text-overflow: ellipsis;}
.cover:after{height: 50%;width:100%;left: 0;top:50%;z-index: 1;content:"";position: absolute;
background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5));opacity: .5}
.disabled{color: #aaa;background-color: #fbfbfb}
.album .cover{padding-top:85.33%}
.album .cover::after{display: none;}
.tl_info{font-size: 26rpx;line-height: 1.6}
.tl_info view{word-break: keep-all;overflow: hidden;text-overflow: ellipsis;white-space: nowrap}
.tl_info .tli_des{color: #888;font-size: 24rpx}
.flexlist .flexlist{flex: 1;padding:10rpx 10rpx 10rpx 0;margin:0;align-items: center;margin-left: 0; box-sizing: border-box;overflow: hidden;line-height: 1.5;position: relative;border-bottom:1rpx solid #e1e2e3}
.cur,.cur .fm_tdes,.cur .flexmain view text,.cur .relistdes,.cur .flexnum{color:#BB2C08 !important }
.flexlist{display: flex;align-items: stretch;}
.flexlist .flexlist .flexleft{padding-right: 10rpx}
.flexleft image{vertical-align: middle}
.flex-center{align-items: center}
.flexnum{flex: 0 0 80rpx;font-size: 30rpx;color: #999; text-align: center}
.flexact{ text-align: right;font-size: 24rpx;color: #999;display: flex}
.flexmain{box-sizing:  border-box;flex: 1;overflow: hidden;}
.fm_tdes{font-size: 24rpx;color: #999}
.flexmain view{word-break: keep-all;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;line-height: 1.6;width: 100%; word-wrap: break-word}
.flexmain view text{color: #999;}
.flexmain .lname{max-height: 2.4em;line-height: 1.2;white-space: normal;}
.relistdes{color: #999;font-size: 24rpx;white-space: -2rpx;}
.listheader{margin:25rpx 15rpx 10rpx;overflow: hidden}
.listheader:before{display: inline-block;width: 5rpx;background-color: red;height: .8em;content:"";vertical-align: middle;margin-right: 15rpx;border-radius: 10rpx;}
.flex-boxlist{overflow: hidden;display: flex;flex-wrap:wrap;}
</style>


