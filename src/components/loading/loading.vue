<template>
  <div class="loading">
    <div class="content">
      <span class="icon">{{title}}</span>
      <span class="text">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '房源锁定中...'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.loading
  width 100%
  overflow hidden
  .content
    text-align center
    margin 0 60px
    font-size 0
    background #eee
    border-radius 10px
    .icon
      display inline-block
      vertical-align middle
      width 70px
      height 50px
      background-image url($loading)
      background-repeat no-repeat
      background-size 50px
    .text
      display inline-block
      vertical-align middle
      height 100px
      line-height 100px
      font-size 18px
      color #333
</style>
