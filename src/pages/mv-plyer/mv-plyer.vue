<template>
  <div class="mv-plyer">
    <video v-if="mv.brs" id="myVideo" :src="'http://localhost:3000/mv/url?url=' + mv.brs['480']"   enable-danmu danmu-btn controls></video>
    <div class="name">{{mv.name}}</div>
    <div class="artist">歌手:{{mv.artistName}}</div>
    <div class="info">
      <span class="publishTime">播放时间:{{mv.publishTime}}</span>
      <span class="playCount">播放次数:{{mv.playCount}}</span>
    </div>
    <div class="hotComment">
      <div class="title">评论</div>
      <div class="comment" v-for="item in comments" :key="item.commentId">
        <div class="left">
          <img :src="item.user.avatarUrl" class="avatarUrl" alt="">
        </div>
        <div class="conter">
          <p class="name">{{item.user.nickname}}</p>
          <p class="content">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import {getMvInfo, getCommentMv} from '../../api//mv'
import {HTTP_CODE} from '../../config'

export default {
  data () {
    return {
      mv: {},
      hotComments: {},
      comments: {}
    }
  },
  beforeMount () {
    const {id} = this.$route.query
    if (!id) {
      this.$router.back()
    }
    this._getMvInfo(id)
    this._getCommentMv(id)
  },
  methods: {
    async _getMvInfo (id) {
      const {code, data} = await getMvInfo(id)
      if (code === HTTP_CODE) {
        this.mv = data
      }
    },
    async _getCommentMv (id) {
      const {code, hotComments, comments} = await getCommentMv(id)
      if (code === HTTP_CODE) {
        this.hotComments = hotComments
        this.comments = comments
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.mv-plyer
  padding 0 5px
  height 250px
  .name
    font-size 16px
    line-height 1.5
  .artist
    font-size 14px
    color #00b7f8
    line-height 2
  .info
    display flex 
    font-size 12px
    line-height 2
    color  #e8ecef
  .hotComment
    .title
      font-size 16px
      line-height 4
    .comment
      display flex
      align-items center
      padding 10px 0
      .avatarUrl
        width 50px
        height 50px
        border-radius 50%
    .conter
      margin-left 15px
      font-size 14px
      line-height 1.5
      .name
        font-size 12px
        line-height 2
        color  #e8ecef
#myVideo
  width 100%
  height 100%  
</style>
