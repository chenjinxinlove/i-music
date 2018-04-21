<template>
  <div class="songType">
    <div class="header" @click="selectType('全部歌单', 'false')"  :class="{select: getSelectValue === '全部歌单'}">
      <span>全部歌单</span>
      <img class="imgSelect" :src="'http://objheplwd.bkt.clouddn.com/countersign.svg'" v-show="getSelectValue === '全部歌单'" alt="">
    </div>
    <div class="types" v-for="(type, index) in types" :key="index">
      <div v-for="(item ,key) in type" :key="key" 
        :class="{type: !key, hot: item.hot, select: getSelectValue === item.name}" 
        @click="selectType(item.name, item.type)" 
        class="item">
        <img class="imgIcon" :src="'http://objheplwd.bkt.clouddn.com/' + item.icon" v-if="item.type === 'theme'" alt="">
        <img class="imgHot" :src="'http://objheplwd.bkt.clouddn.com/hot.svg'" v-if="item.hot" alt="">
        <img class="imgSelect" :src="'http://objheplwd.bkt.clouddn.com/countersign.svg'" v-if="getSelectValue === item.name" alt="">
        <p>{{item.name}}</p> 
      </div>
    </div>
  </div> 
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  data () {
    return {
      types: [
        [
          {name: '语种', type: 'theme', hot: false, icon: 'global.svg'},
          {name: '华语', type: 'item', hot: true},
          {name: '欧美', type: 'item', hot: false},
          {name: '日语', type: 'item', hot: false},
          {name: '韩语', type: 'item', hot: false},
          {name: '粤语', type: 'item', hot: false},
          {name: '小语', type: 'item', hot: false}
        ],
        [
          {name: '风格', type: 'theme', hot: false, icon: 'style.svg'},
          {name: '流行', type: 'item', hot: true},
          {name: '摇滚', type: 'item', hot: true},
          {name: '民谣', type: 'item', hot: true},
          {name: '电子', type: 'item', hot: true},
          {name: '舞曲', type: 'item', hot: false},
          {name: '说唱', type: 'item', hot: false},
          {name: '轻音乐', type: 'item', hot: true},
          {name: '爵士', type: 'item', hot: false},
          {name: '乡村', type: 'item', hot: false},
          {name: 'R&B/Soul', type: 'item', hot: false},
          {name: '古典', type: 'item', hot: false},
          {name: '民族', type: 'item', hot: false},
          {name: '英伦', type: 'item', hot: false},
          {name: '金属', type: 'item', hot: false},
          {name: '朋克', type: 'item', hot: false},
          {name: '蓝调', type: 'item', hot: false},
          {name: '雷鬼', type: 'item', hot: false},
          {name: '世界音乐', type: 'item', hot: false},
          {name: '拉丁', type: 'item', hot: false},
          {name: '另类/独立', type: 'item', hot: false},
          {name: 'New Age', type: 'item', hot: false},
          {name: '古风', type: 'item', hot: false},
          {name: '后摇', type: 'item', hot: false},
          {name: 'Bossa Nova', type: 'item', hot: false},
          {name: '', type: 'item', hot: false},
          {name: '', type: 'item', hot: false}
        ],
        [
          {name: '场景', type: 'theme', hot: false, icon: 'scene.svg'},
          {name: '清晨', type: 'item', hot: false},
          {name: '夜晚', type: 'item', hot: true},
          {name: '学习', type: 'item', hot: true},
          {name: '工作', type: 'item', hot: false},
          {name: '午休', type: 'item', hot: false},
          {name: '下午茶', type: 'item', hot: false},
          {name: '地铁', type: 'item', hot: true},
          {name: '驾车', type: 'item', hot: false},
          {name: '运动', type: 'item', hot: true},
          {name: '旅行', type: 'item', hot: false},
          {name: '散步', type: 'item', hot: false},
          {name: '酒吧', type: 'item', hot: false},
          {name: '', type: 'item', hot: false},
          {name: '', type: 'item', hot: false}
        ],
        [
          {name: '情感', type: 'theme', hot: false, icon: 'emotion.svg'},
          {name: '怀旧', type: 'item', hot: true},
          {name: '清新', type: 'item', hot: true},
          {name: '浪漫', type: 'item', hot: false},
          {name: '性感', type: 'item', hot: false},
          {name: '伤感', type: 'item', hot: false},
          {name: '治愈', type: 'item', hot: false},
          {name: '放松', type: 'item', hot: false},
          {name: '孤独', type: 'item', hot: false},
          {name: '感动', type: 'item', hot: false},
          {name: '兴奋', type: 'item', hot: false},
          {name: '快乐', type: 'item', hot: false},
          {name: '安静', type: 'item', hot: false},
          {name: '思念', type: 'item', hot: false},
          {name: '', type: 'item', hot: false}
        ],
        [
          {name: '主题', type: 'theme', hot: false, icon: 'theme.svg'},
          {name: '影视原声', type: 'item', hot: true},
          {name: 'ACG', type: 'item', hot: true},
          {name: '校园', type: 'item', hot: false},
          {name: '游戏', type: 'item', hot: false},
          {name: '70后', type: 'item', hot: false},
          {name: '80后', type: 'item', hot: false},
          {name: '90后', type: 'item', hot: false},
          {name: '网路歌曲', type: 'item', hot: false},
          {name: 'KTV', type: 'item', hot: false},
          {name: '经典', type: 'item', hot: false},
          {name: '翻唱', type: 'item', hot: false},
          {name: '吉他', type: 'item', hot: false},
          {name: '钢琴', type: 'item', hot: false},
          {name: '器乐', type: 'item', hot: false},
          {name: '儿童', type: 'item', hot: false},
          {name: '榜单', type: 'item', hot: false},
          {name: '00后', type: 'item', hot: false},
          {name: '', type: 'item', hot: false}
        ]
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getSelectValue'
    ])
  },
  methods: {
    typeClass (index) {
      return index === 0 ? 'type' : 'item'
    },
    selectType (name, type) {
      if (type === 'theme' && !name) {
        return
      }
      this.setSelectValue(name)
      // 微信小程序api
      this.$router.back()
    },
    ...mapMutations({
      'setSelectValue': 'SET_SELECT_VALUE'
    })
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.songType
  background $color-aux-five
  .header
    line-height 60px
    text-align center
    background $color-background
    position relative
    border 1rpx solid rgba(0, 0, 0, 0)
  .hot
    .imgHot
      height 40px
      width 17px
      position absolute
      top -10px
      left 5px     
  .types
    background $color-background
    margin 10px 0 0 0
    overflow hidden
    font-size $font-size-mix
    .item
      float left
      height 50px
      line-height 50px
      width 25%
      box-sizing border-box
      text-align center
      border-right 1rpx $color-aux-five solid
      border-top 1rpx $color-aux-five solid
      position relative
    .type
      float left
      height 100px
      width 25%
      line-height 2
      text-align center
      display flex
      justify-content center
      align-items center
      flex-direction column
      .imgIcon
        width 30px
        height 30px
        display block
    .select
      border 1px solid $color-text
  .select
    border 1rpx solid $color-text
    .imgSelect
      height 10px
      width 20px
      position absolute
      bottom 0px
      right 0px
      background #000  
    

</style>
