<template>
  <div class="songList">
    <div class="blur header-wrapper" :style="headerImgBg"></div>
    <div @click="selectItem(songListHot)">
      <div class="header">
        <div class="left">
          <img class="img" :src="songListHot.coverImgUrl" alt="" >
        </div>
        <div class="right">
          <div class="title">
            <p>精品歌单</p>
          </div>
          <p class="name">{{songListHot.name}}</p>
          <p class="copywriter">{{songListHot.copywriter}}</p>
        </div>
      </div>
    </div>
    <div class="select-wrapper" >
      <a href="../select-song-type/main">
        <div class="select">
          <span>{{getSelectValue}}</span>
          <icons type='right' size="16" color="#b9b8bc"></icons>
        </div>
       </a>
      <div class="selectList">
        <span class="selectItem" @click="setSelectValue('华语')">华语</span>
        <span class="selectItem" @click="setSelectValue('摇滚')">摇滚</span>
        <span class="selectItem" @click="setSelectValue('影视原生')">影视原声</span>
      </div>
    </div>
    <div class="list-wrapper" v-if="songlist.length">
      <div  class="item" v-for="(item, index) in songlist" :key="index">
        <div @click="selectItem(item)">
          <img class="img" :src="item.coverImgUrl" alt="">
          <div class="play-count">
            <icons type='headphones' size='14' color="#fff"></icons>
            <span class="span">{{item.playCount}}</span>
          </div>
          <div class="author">
            <icons type='singer' size="14" color="#fff"></icons>
            <span class="span nickname">{{item.subscribers[0].nickname}}</span>
          </div>
          <div class="name">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import {getSongList} from '../../api/songList'
import {HTTP_CODE} from '../../config'
import {mapMutations, mapGetters} from 'vuex'
import Icons from '@/components/icon/icon'
import Loading from '@/components/loading/loading'

export default {
  data () {
    return {
      songListHot: {},
      headerImgBg: '',
      songlist: [],
      limit: 20,
      offset: 0
    }
  },
  computed: {
    ...mapGetters([
      'getSelectValue'
    ])
  },
  watch: {
    getSelectValue (value) {
      this._getSongList(false, value)
    }
  },
  created () {
    this._getSongList(true, '')
    this._getSongList(false, '摇滚')
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: `/pages/songs-details/main?id=${item.id}`
      })
      this.setRecommendDisc(item)
    },
    async _getSongList (type, cat) {
      const data = await getSongList(cat, this.limit, this.offset)
      const {code, playlists} = data

      if (code === HTTP_CODE) {
        if (type) {
          const songListHot = playlists.shift()
          this.songListHot = songListHot
          this.headerImgBg = `background:url(${songListHot.coverImgUrl}) center`
          this.setSongListHots(playlists)
        } else {
          this.songlist = playlists
        }
      }
    },
    ...mapMutations({
      'setSongListHots': 'SET_SONG_LIST_HOTS',
      'setSelectValue': 'SET_SELECT_VALUE',
      'setRecommendDisc': 'SET_RECOMMEND_DISC'
    })
  },
  components: {
    Icons,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.blur    
  filter blur(5px)
  opacity 0.5
.songList
  .header-wrapper
    position relative
    height 125px
  .header
    position absolute
    top 0
    padding 20px 20px 15px 10px
    display flex
    .left
      width 100px
      height 100px
      .img
        width 100%
        height 100%
    .right
      margin-left 10px
      color $color-background
      line-height 2
      .title
        display flex
        align-items center
        justify-content flex-start
        font-size $font-size-boid
      .name
        font-size $font-size-text
        text-align right
        no-wrap()
      .copywriter
        font-size $font-size-mix
        color $color-aux-menu
        line-height 1.5
  .select-wrapper
    padding 0 15px
    height 60px
    line-height 60px
    display flex
    justify-content space-between
    align-items center
    font-size $font-size-text
    .select
      display flex
      align-items center
      justify-content center
      border 1px solid $color-aux-five
      border-radius 40px
      padding 5px 5px 5px 10px
      line-height 1.5
    .selectList
      font-size $font-size-mix
      color $color-aux-four
      .selectItem
        padding 0 10px
        border-right 1px solid $color-aux-five
      .selectItem:last-child
        border none
  .list-wrapper
    justify-content space-between
    display flex
    flex-wrap wrap
    .item
      width 50%
      padding 0 1px 5px 1px
      box-sizing border-box
      position relative
      color $color-background
      font-size $font-size-mix
      .img
        display inline-block
        width 100%
        height 180px
      .play-count
        position absolute
        right 5px
        top 5px
        display flex
        align-items center
      .author
        position absolute    
        left 5px
        top 160px
        display flex
        align-items center
      .name
        color $color-text-menu
      .span
        margin-left 5px
</style>
