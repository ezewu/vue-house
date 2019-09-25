<template>
  <div class="selecting">
    <div class="huxing-infos">
      <div class="infos-top">
        <div class="card">
          <div class="title">确认选房</div>
          <div class="desc">1号楼1单元1903</div>
          <div class="price">￥217.8万元</div>
        </div>
      </div>
      <div class="infos-bottom">
        <div class="user-name">
          <div class="user-title">购买人:</div>
          <div class="user-name">吴友新</div>
        </div>
        <div class="user-tel">
          <div class="user-title">手机号:</div>
          <div class="user-tel">18672102929</div>
        </div>
        <div class="protocol-area">
          <span class="checked active"></span>
          <span class="area-text">我已阅读并同意《在线选房须知》</span>
        </div>
        <div class="protocol-btn">
          <div class="btn refuse">取消</div>
          <div class="btn">确认</div>
        </div>
      </div>
    </div>
    <div class="loading-container">
      <loading></loading>
    </div>
    <success @source="handleToSource"></success>
  </div>
</template>


<script>
import loading from '@/loading/loading'
import success from '@/success/success'
export default {
  methods: {
    handleToSource() {
      console.log('success')
    }
  },
  components: {
    loading,
    success
  }
}
</script>


<style lang="stylus" scoped>
@import '~#/stylus/icon'
.selecting
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background rgba(7, 17, 27, 0.6)
  z-index 60
  .huxing-infos
    position absolute
    top 50%
    left 50%
    width 290px
    border-radius 4px 4px 0 0
    background #fff
    margin-top -210px
    margin-left -145px
    z-index 70
    overflow hidden
    .infos-top
      width 290px
      height 230px
      overflow hidden
      background-color #0069b4
      .card
        width 260px
        height 198px
        margin-left 15px
        margin-top 15px
        background-image url($card)
        text-align center
        background-position 0 0
        background-repeat no-repeat
        background-size cover
        .title
          line-height 50px
          font-size 15px
          color #333
        .desc
          width 220px
          margin 0 auto
          height 60px
          line-height 60px
          color #333
          font-size 20px
          background rgba(220, 20, 20, 0.1)
          border 1px solid #ccc
        .price
          margin-top 40px
          font-size 26px
          color #f00
    .infos-bottom
      padding 20px
      color #666
      .user-name, .user-tel
        font-size 0
        .user-title
          line-height 24px
          display inline-block
          font-size 13px
        .user-tel, .user-name
          display inline-block
          font-size 13px
      .protocol-area
        height 24px
        line-height 24px
        margin 15px 0
        font-size 0
        color #999
        .checked
          display inline-block
          vertical-align middle
          width 20px
          height 20px
          margin-right 5px
          &.no-active
            border 2px solid #d8d8d8
            border-radius 50%
            box-sizing border-box
          &.active
            background-image url($checked)
            background-position 0 0
            background-repeat no-repeat
            background-size cover
        .area-text
          display inline-block
          vertical-align middle
          font-size 14px
      .protocol-btn
        display flex
        flex-wrap wrap
        box-sizing border-box
        .btn
          flex 1
          display block
          height 40px
          line-height 40px
          background #0069b4
          border-radius 2px
          text-align center
          font-size 16px
          color #fff
        .refuse
          background-color #bbb
          margin-right 10px
  .loading-container
    position absolute
    width 100%
    top 50%
    z-index 70
    transform translateY(-50%)
</style>
