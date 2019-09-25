<template>
  <div class="collect" ref="collect">
    <div class="collect-wrapper">
      <div class="collect-list">
        <ul>
          <li class="item" :key="item.id" v-for="(item,index) of list">
            <div class="id">{{index+1}}</div>
            <div class="desc">
              <div class="list-title">{{item.title}}</div>
              <div class="list-desc">{{item.price}}万 {{item.area}}㎡ {{item.collect}}收藏</div>
            </div>
            <span class="close">
            </span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      list: [
        {
          title: '11号楼1单元-1903',
          price: '217.84',
          area: '133.75',
          collect: 56
        },
        {
          title: '2号楼1单元-1103',
          price: '137.84',
          area: '33.7',
          collect: 14
        },
        {
          title: '1号楼3单元-803',
          price: '517.84',
          area: '133.75',
          collect: 52
        },
        {
          title: '8号楼1单元-1403',
          price: '217.84',
          area: '133.75',
          collect: 10
        },
        {
          title: '3号楼1单元-1703',
          price: '27.84',
          area: '13.75',
          collect: 35
        },
        {
          title: '4号楼1单元-303',
          price: '117.84',
          area: '83.75',
          collect: 19
        },
        {
          title: '4号楼1单元-303',
          price: '117.84',
          area: '83.75',
          collect: 19
        },
        {
          title: '1号楼1单元-303',
          price: '117.84',
          area: '83.75',
          collect: 19
        },
        {
          title: '4号楼1单元-303',
          price: '117.84',
          area: '83.75',
          collect: 19
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll() {
      if (!this.collectScroll) {
        this.collectScroll = new BScroll(this.$refs.collect, {
          click: true,
          flickLimitDistance: 50
        })
      } else {
        this.collectScroll.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.collect
  position absolute
  top 100px
  left 0
  bottom 100px
  overflow hidden
  width 100%
  &.protocol-enter-active, &.protocol-leave-active
    transition all 0.3s linear
  &.protocol-enter, &.protocol-leave-to
    opacity 0
    transform translate3d(100%, 0, 0)
  .collect-list
    .item
      display flex
      padding 20px 0
      height 120px
      line-height 120px
      border-bottom 1px solid #eaeaea
      &.flip-list-move
        transition transform 0.5s
      .id
        flex 0 0 80px
        margin 20px
        width 80px
        line-height 80px
        border-radius 50%
        text-align center
        background #0069b4
        font-size 48px
        color #fff
      .desc
        flex 1
        margin 0 40px
        .list-title
          height 60px
          line-height 60px
          font-size 40px
        .list-desc
          height 60px
          line-height 60px
          font-size 30px
          color #666
      .close
        flex 0 0 100px
        display inline-block
        width 100px
        height 120px
        background-image url($close)
        background-size 40px 40px
        background-repeat no-repeat
        background-position 50% 50%
</style>
