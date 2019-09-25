<template>
  <div class="login">
    <div class="login-bg">
      <h3 class="login-title">[示例]润湖翡翠公园</h3>
      <span class="login-subtitle">在线选房系统</span>
      <img class="login-bg" src="https://t1.focus-res.cn/house-on-sale/wap/img/login-bg.1456a03.png">
    </div>
    <div class="login-ctx">
      <div class="pannel-login">
        <div class="input-w">
          <span class="icon tel"></span>
          <div class="cell">
            <input type="tel" v-model="tel" placeholder="请输入售楼处预留电话号码" maxlength="11">
          </div>
        </div>
        <div class="input-w">
          <span class="icon name"></span>
          <div class="cell">
            <input type="text" v-model="name" placeholder="请输入售楼处预留真实姓名">
          </div>
        </div>
        <div class="input-w">
          <span class="icon imgcode"></span>
          <div class="cell">
            <input type="url" v-model="code" placeholder="请输入图片验证码" maxlength="6">
          </div>
          <img @click="handleGetCode" class="imgcode-auth" :src="captcha">
        </div>
        <!-- <div class="input-w">
          <span class="icon getcode"></span>
          <div class="cell">
            <input type="number" placeholder="请输入验证码" maxlength="6">
          </div>
          <div class="get-code">获取验证码</div>
        </div> -->
        <div @click="handleLogin" class="btn">确认</div>
      </div>
    </div>
    <top-tip :tipText="tipText" ref="topTip"></top-tip>
  </div>
</template>
<script>
import TopTip from '@/top-tip/top-tip'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      captcha: '/api/captcha',
      oneButton: true,
      tipText: '手机号或姓名有误',
      name: '',
      tel: '',
      code: ''
    }
  },
  methods: {
    handleLogin() {
      this._postList()
    },
    _postList() {
      if (!this.verification()) {
        return
      }
      if (!this.handleChangeCode()) {
        return
      }
      this.$axios
        .post('/api/verify', {
          name: this.name,
          tel: this.tel,
          code: this.code
        })
        .then(res => {
          let msg = res.data.msg
          if (res.data.success) {
            let token = res.data.token
            let users = res.data.users
            window.localStorage.setItem('token', token)
            this.$router.push({ name: 'protocol', params: { oneButton: true } })
            this.setUsers(users)
          } else {
            this.handleGetCode()
            this.tipText = msg
            this.$refs.topTip.show()
          }
        })
    },
    handleChangeTel(tel) {
      let reg = /^((1)3(\d){9}$)|(^(1)4[5-9](\d){8}$)|(^(1)5[^4]{9}$)|(^(1)66(\d){8}$)|(^(1)7[0-8](\d){8}$)|(^(1)8(\d){9}$)|(^(1)9[8-9](\d){8}$)/
      if (reg.test(tel)) {
        return true
      } else {
        return false
      }
    },
    handleChangeName(name) {
      let reg = /^[\u4e00-\u9fa5]{1,6}$/g
      if (reg.test(name)) {
        return true
      } else {
        return false
      }
    },
    handleChangeCode() {
      if (this.code.length < 4) {
        this.tipText = '请输入正确验证码'
        this.$refs.topTip.show()
        return false
      }
      return true
    },
    verification() {
      if (!this.handleChangeTel(this.tel)) {
        this.tipText = '请输入正确手机号'
        this.$refs.topTip.show()
        return false
      }
      if (!this.handleChangeName(this.name)) {
        this.tipText = '请输入正确姓名'
        this.$refs.topTip.show()
        return false
      }
      return true
    },
    handleGetCode() {
      if (!this.verification()) {
        return
      }
      this.captcha = '/api/captcha?d=' + Math.random()
    },
    ...mapMutations({
      setUsers: 'SET_USERS'
    })
  },
  components: {
    TopTip
  }
}
</script>
<style lang="stylus" scoped>
@import '~#/stylus/icon'
.login-bg
  position relative
  width 100%
  height 434px
  text-align center
  color #fff
  overflow hidden
  .login-title
    position relative
    display inline-block
    font-weight 400
    margin-top 116px
    font-size 52px
    line-height 60px
    width 700px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    z-index 1
  .login-subtitle
    position relative
    display inline-block
    margin-top 26px
    padding 20px
    font-size 32px
    line-height 32px
    background rgba(0, 0, 0, 0.7)
    font-weight 400
    z-index 1
  .login-bg
    position absolute
    top 0
    left 0
    width 100%
    height 100%
.login-ctx
  z-index 2
  .pannel-login
    margin 0 auto
    padding 64px 60px 90px
    width 750px
    height 742px
    box-sizing border-box
    background #fff
    .input-w
      display flex
      height 112px
      width 100%
      font-size 0
      box-sizing border-box
      background #fff
      border-bottom 1px solid #eee
      .icon
        display block
        flex 0 0 32px
        margin-top 38px
        width 32px
        height 34px
        margin-right 24px
        background-size 32px 34px
        background-repeat no-repeat
        &.tel
          background-image url($tel)
        &.name
          background-image url($name)
        &.imgcode
          background-image url($imgcode)
        &.getcode
          background-image url($getcode)
      .cell
        flex 1
        width 0
        flex-basis 0
        max-width 100%
        input
          height 110px
          width 100%
          font-size 32px
          color #666
          letter-spacing 0
          border none
          box-sizing border-box
          padding 38px 0
          outline none
        input::placeholder
          color #999
      .imgcode-auth
        height 60px
        width 166px
        margin-top 24px
        line-height 110px
      .get-code
        color #999
        line-height 110px
        text-align right
        width 230px
        height 110px
        font-size 32px
    .btn
      display block
      width 100%
      height 88px
      background #0069b4
      border-radius 8px
      text-align center
      line-height 88px
      font-size 36px
      margin-top 50px
      color #fff
</style>
