<template>
  <div class="me">
    <div class="user-wrapper">
      <h4 class="user-name">{{users.name}}</h4>
      <h4 class="user-tel">{{users.tel}}</h4>
      <div @click="handleAbort" class="abort">
        <span class="abort-icon"></span>
      </div>
    </div>
    <div class="content-wrapper">
      <router-link to="/vselect/collect" class="item" tag="div">
        <span class="icon collect"></span>
        <div class="text">我的收藏</div>
        <span class="right-icon"></span>
      </router-link>
      <router-link to="/mesource" class="item" tag="div">
        <span class="icon source"></span>
        <div class="text">我的房源</div>
        <span class="right-icon"></span>
      </router-link>
      <div @click="handleProtocolShow" class="item">
        <span class="icon need"></span>
        <div class="text">选房须知</div>
        <span class="right-icon"></span>
      </div>
      <a class="item" :href="rooms_tel">
        <span class="icon tel"></span>
        <div class="text">电话咨询</div>
        <span class="right-icon"></span>
      </a>
    </div>
    <confirm @confirm="handleConfirm" ref="confirm"></confirm>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import confirm from '@/confirm/confirm'
export default {
  name: 'me',
  methods: {
    handleProtocolShow() {
      this.$router.push({ name: 'protocol', params: { oneButton: false } })
    },
    handleAbort() {
      this.$refs.confirm.show()
    },
    handleConfirm() {
      window.localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['users', 'rooms_tel'])
  },
  components: {
    confirm
  }
}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.me
  width 100%
  overflow hidden
  .user-wrapper
    position relative
    display flex
    flex-direction column
    justify-content center
    height 400px
    background #0069b4
    text-align center
    color #fff
    .user-name
      font-size 36px
    .user-tel
      margin-top 36px
      font-size 28px
    .abort
      position absolute
      top 60px
      right 60px
      border 4px solid rgba(250, 250, 250, 0.6)
      border-radius 50%
      padding 12px
      .abort-icon
        display block
        width 48px
        height 48px
        background-repeat no-repeat
        background-size cover
        background-image url($abort)
  .content-wrapper
    display flex
    flex-direction column
    padding 0 40px
    .item
      display flex
      height 110px
      line-height 110px
      border-bottom 1px solid #eaeaea
      text-decoration none
      font-size 0
      color #333
      .icon
        display inline-block
        flex 0 0 60px
        width 60px
        height 110px
        background-position 0 50%
        background-repeat no-repeat
        background-size 36px
        &.collect
          background-image url($collect)
        &.source
          background-image url($source)
        &.need
          background-image url($need)
        &.tel
          background-image url($tel)
      .right-icon
        display inline-block
        flex 0 0 30px
        width 30px
        height 110px
        background-position 0 50%
        background-repeat no-repeat
        background-size 24px
        background-image url($right_icon)
      .text
        display inline-block
        flex 1
        font-size 32px
</style>

