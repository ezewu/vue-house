<template>
  <transition name="desc">
    <div v-if="showDesc" class="desc">
      <div class="desc-wrapper" ref="descWrapper">
        <div class="content">
          <div class="header">
            <img src="https://t.focus-img.cn/sh750x420esh/kp/hx/1168-fe80-0539-0e69-bb43-e696-5252-3781.jpg">
          </div>
          <div class="info">
            <div class="title">1号楼1单元-2003</div>
            <div class="price-wrapper">
              <div class="price">￥215.8万</div>
              <div class="hx-content">
                <span class="name">户型:</span>
                <span class="hx-desc">峰景C</span>
              </div>
            </div>
            <div class="house">
              <div class="house-item">133.68㎡</div>
              <div class="house-item">3室二厅</div>
              <div class="house-item">165485元/㎡</div>
              <div class="house-item">收藏36次</div>
            </div>
            <div class="so-content">
              <span class="icon"></span>
              <span class="text">收藏</span>
            </div>
          </div>
          <div class="bulletin">
            <h2 class="title">户型描述</h2>
            <p class="content">时尚三房空间，彰显高性能舒居价值。客厅、餐厅、入户花园、大阳台链接，阳光通透、健康居家。高层精致，居室设计紧凑合理，南北通透，两梯三户，高速电梯，上下便利，双卧与起居室均朝阳，极大！是不可多得的好户型 </p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="listing" @click.stop="handleToListing">
          <span class="icon listing"></span>
          <span class="text">所有房源</span>
        </div>
        <div class="collect" @click.stop="handleToCollect">
          <span class="icon collect"></span>
          <span class="text">我的收藏</span>
        </div>
        <div class="btn-content">立即抢房</div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      showDesc: false
    }
  },
  methods: {
    handleShow() {
      this.showDesc = true
      this.$nextTick(() => {
        this.descScroll = new BScroll(this.$refs.descWrapper, {
          click: true
        })
      })
    },
    handleToListing() {
      this.showDesc = false
      this.$emit('collect')
      this.$router.push({ name: 'listing' })
    },
    handleToCollect() {
      this.showDesc = false
      this.$router.push({ name: 'collect' })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.desc
  position fixed
  left 0
  top 0
  height 100%
  width 100%
  z-index 30
  background #fff
  &.desc-enter-active, &.desc-leave-active
    transition all 0.2s linear
  &.desc-enter, &.desc-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
  .desc-wrapper
    position absolute
    top 0
    bottom 50px
    width 100%
    overflow hidden
    .header
      position relative
      width 100%
      height 0
      padding-top 84%
      img
        position absolute
        top 0
        left 0
        width 100%
    .info
      position relative
      margin 0 10px
      border-bottom 1px solid rgba(7, 17, 27, 0.2)
      color #666
      .title
        height 30px
        line-height 30px
        color #333
        font-size 20px
        font-weight 700
      .price-wrapper
        height 40px
        line-height 40px
        font-size 0
        .price
          display inline-block
          margin-right 30px
          color #f00
          font-size 20px
        .hx-content
          display inline-block
          font-size 14px
      .house
        display flex
        text-align center
        .house-item
          flex 1
          height 30px
          line-height 30px
          margin 12px 0
          border-right 1px solid rgba(7, 17, 27, 0.2)
          font-size 15px
          &:last-child
            border-right none
      .so-content
        position absolute
        top 0
        right 0
        width 50px
        text-align center
        .icon
          display block
          width 100%
          height 30px
          background-position 50%
          background-repeat no-repeat
          background-size 22px
          background-image url($collect)
        .text
          font-size 13px
          color #666
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        line-height 14px
        color #333
        font-size 16px
        font-weight 500
      .content
        line-height 28px
        font-size 13px
        color #666
  .bottom
    position absolute
    display flex
    bottom 0
    left 0
    height 50px
    width 100%
    .listing, .collect
      flex 1
      text-align center
      .icon
        display block
        width 100%
        height 30px
        background-position 50%
        background-repeat no-repeat
        background-size 20px
        &.listing
          background-image url($listing)
        &.collect
          background-image url($collect)
      .text
        font-size 13px
        color #666
    .btn-content
      flex 2
      background #0069b4
      line-height 50px
      font-size 18px
      color #fff
      text-align center
</style>
