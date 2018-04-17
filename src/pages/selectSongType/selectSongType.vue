<template>
  <div class="songType">
    <div class="header" :class="{select: getSelectValue === '华语'}">
      全部歌单
    </div>
    <div class="types" v-for="(type, index) in types" :key="index">
      <div v-for="(item ,key) in type" :key="key" 
        :class="{type: !key, hot: item.hot, select: getSelectValue === item.name}" 
        @click="selectType(item.name, item.type)" 
        class="item">
        {{item.name}}
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
          {name: '语种', type: 'theme', hot: false},
          {name: '华语', type: 'item', hot: true},
          {name: '欧美', type: 'item', hot: false},
          {name: '日语', type: 'item', hot: false},
          {name: '韩语', type: 'item', hot: false},
          {name: '粤语', type: 'item', hot: false},
          {name: '小语', type: 'item', hot: false}
        ],
        [
          {name: '风格', type: 'theme', hot: false},
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
          {name: '场景', type: 'theme', hot: false},
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
          {name: '情感', type: 'theme', hot: false},
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
          {name: '主题', type: 'theme', hot: false},
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
      wx.navigateBack()
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
  .select
      background blue  
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
      // border-bottom 1rpx $color-aux-five solid
    .type
      float left
      height 100px
      width 25%
      line-height 100px
      text-align center
    .hot
      background red
</style>
