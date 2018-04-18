<template>
  <div class="loading">
    <img class="img" src="https://loading.io/assets/img/hourglass.svg">
    <p class="desc">正在载入...</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .img
      width 20px
      height 20px
    .desc
      line-height: 20px
      font-size: $font-size-mix
      color: #000
</style>
