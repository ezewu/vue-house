<template>
  <div class="bottom-wrapper">
    <div class="buttom">
      <router-link to="/index">
        <span class="icon home"></span>
        <div class="text">首页</div>
      </router-link>
    </div>
    <router-link to="/vselect/listing">
      <div class="selet-wrap">选房</div>
    </router-link>
    <div class="buttom">
      <router-link to="/me">
        <span class="icon me"></span>
        <div class="text">我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.bottom-wrapper
  display flex
  position fixed
  bottom 0
  left 0
  width 100%
  height 100px
  z-index 10
  border-top 1px solid rgba(7, 17, 27, 0.2)
  .selet-wrap
    position relative
    bottom 60px
    flex 0 0 140px
    width 140px
    height 140px
    line-height 140px
    text-align center
    font-size 40px
    color #fff
    background #0069b4
    border-radius 50%
  .buttom
    flex 1
    text-align center
    margin-top 6px
    font-size 0
    .router-link-active
      .icon
        &.home
          background-image url($home_fill)
        &.me
          background-image url($friend_add_fill)
      .text
        color #0069b4
    .icon
      display inline-block
      width 50px
      height 50px
      background-position 0 0
      background-repeat no-repeat
      background-size cover
      &.home
        background-image url($home)
      &.me
        background-image url($friend_add)
    .text
      margin-top 6px
      font-size 28px
      color #999
</style>
