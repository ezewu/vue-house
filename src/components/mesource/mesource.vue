<template>
  <div class="mesource">
    <div v-if="order" class="order">
      <div class="icon-bg">
        <span class="icon"></span>
      </div>
      <h2 class="title">您还没有成功选房</h2>
      <router-link to="/me">
        <div class="btn">返回</div>
      </router-link>
    </div>
    <div class="house">
      <div class="desc-wrapper">
        <div class="header-item">
          <div class="icon-content">
            <span class="header-icon"></span>
          </div>
          <span class="header-text">1号楼1单元1704</span>
        </div>
        <div class="item">
          <span class="icon time"></span>
          <span class="text">时间：2018-06-14 15:48:11</span>
        </div>
        <div class="item">
          <span class="icon names"></span>
          <span class="text">姓名：吴友新</span>
        </div>
        <div class="item">
          <span class="icon ipone"></span>
          <span class="text">电话：18672102929</span>
        </div>
        <div class="item">
          <span class="price-title">总价：</span>
          <span class="price-text">￥2,220,147.00元</span>
        </div>
      </div>
      <div class="protocol-btn">
        <div class="btn refuse">取消购房</div>
        <div class="btn">返回</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    order: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~#/stylus/icon'
.mesource
  width 100%
  overflow hidden
  .order
    position absolute
    top 50%
    left 50%
    width 100%
    border-radius 8px 8px 0 0
    transform translate(-50%, -70%)
    text-align center
    .icon-bg
      margin 0 auto
      width 240px
      height 240px
      background #ccc
      border-radius 50%
      box-sizing border-box
      padding 60px
      .icon
        display block
        width 100%
        height 100%
        background-image url($kaka)
        background-repeat no-repeat
        background-size cover
    .title
      height 160px
      line-height 160px
      font-size 32px
      color #666
    .btn
      height 100px
      width 60%
      margin 0 auto
      line-height 100px
      background #0069b4
      font-size 36px
      color #fff
  .house
    margin 40px 28px
    .desc-wrapper
      padding 40px
      box-shadow 0 0 40px #bbb
      .header-item
        font-size 0
        height 100px
        line-height 100px
        color #333
        .icon-content
          display inline-block
          box-sizing border-box
          vertical-align middle
          background #0069b4
          width 80px
          height 80px
          padding 12px
          border-radius 50%
          .header-icon
            display inline-block
            width 100%
            height 100%
            background-image url($key)
            background-repeat no-repeat
            background-size cover
        .header-text
          display inline-block
          margin-left 40px
          vertical-align middle
          font-size 40px
      .item
        font-size 0
        height 80px
        line-height 80px
        color #666
        .icon
          display inline-block
          vertical-align middle
          width 40px
          height 40px
          background-repeat no-repeat
          background-size 40px 40px
          &.time
            background-image url($source)
          &.names
            background-image url($names)
          &.ipone
            background-image url($ipone)
        .text
          display inline-block
          margin-left 20px
          vertical-align middle
          font-size 26px
        .price-title
          font-size 32px
          color rgb(240, 20, 20)
        .price-text
          font-size 56px
          color rgb(240, 20, 20)
    .protocol-btn
      display flex
      flex-wrap wrap
      box-sizing border-box
      margin-top 60px
      .btn
        flex 1
        display block
        height 88px
        line-height 88px
        background #0069b4
        border-radius 4px
        text-align center
        color #fff
        font-size 32px
      .refuse
        background-color #bbb
        margin-right 20px
</style>
