<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <div class="tip-title">
        <span class="icon-err"></span>
        <span class="text">{{tipText}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    tipText: {
      type: String,
      default: '手机号或姓名不一至'
    },
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide() {
      this.showFlag = false
      this.$emit('hide')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.top-tip
  position fixed
  top 0
  width 100%
  z-index 500
  background #0069b4
  &.drop-enter-active, &.drop-leave-active
    transition all 0.3s
  &.drop-enter, &.drop-leave-to
    transform translate3d(0, -100%, 0)
  .tip-title
    text-align center
    padding 24px 0
    font-size 0
    .icon-err
      display inline-block
      margin-right 20px
      vertical-align top
      width 30px
      height 30px
      background-repeat no-repeat
      background-size 30px 30px
      background-image url($sigh)
    .text
      display inline-block
      vertical-align top
      font-size 30px
      color #eee
</style>
