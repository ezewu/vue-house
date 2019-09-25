<template>
  <div class="vselect">
    <div class="tab">
      <router-link tag="div" to="/vselect/listing" class="left">全部房源</router-link>
      <router-link tag="div" to="/vselect/collect" class="right">我的收藏</router-link>
    </div>
    <transition name="vselect">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'vselect'
}
</script>

<style lang="stylus" scoped>
.tab
  display flex
  height 100px
  line-height 100px
  border-bottom 1px solid rgba(7, 17, 27, 0.2)
  box-sizing border-box
  text-align center
  font-size 32px
  .router-link-active
    color #0069b4
    font-weight 700
  .right
    flex 1
  .left
    flex 1
.vselect-enter-active, .vselect-leave-active
  transition all 0.2s linear
.vselect-enter, .vselect-leave-to
  transform translate3d(100%, 0, 0)
</style>
