<template>
  <div class="index-wrapper" ref="indexWrapper">
    <div>
      <div class="index-header">
        <img @load="loadImage" class="image" :src="roomsHome.indexImg">
        <div v-if="handleEndTime" class="countdown">
          <span class="countdown-label">结束倒计时</span>
          <div class="countdown-time">
            <span class="time">{{newDate.Day}}</span>天
            <span class="time">{{newDate.Hour}}</span>时
            <span class="time">{{newDate.Minute}}</span>分
            <span class="time">{{newDate.Second}}</span>秒
          </div>
        </div>
      </div>
      <div class="content">
        <div class="head">
          <div class="title">{{roomsHome.title}}</div>
          <div class="select-count">
            房源总数：
            <span class="count">{{roomsHome.count}}</span>套
          </div>
        </div>
        <div class="bulletin">
          <div class="bulletin-right">
            <h2 class="title">模似选房</h2>
            <div class="content-start">
              <span class="time-title">开始时间:</span>
              <span v-if="roomsHome.test" class="time">{{roomsHome.test.startTime | formatDate}}</span>
            </div>
            <div class="content-end">
              <span class="time-title">结束时间:</span>
              <span v-if="roomsHome.test" class="time">{{roomsHome.test.endTime | formatDate}}</span>
            </div>
          </div>
          <div class="width-flex"></div>
          <div class="bulletin-left">
            <h2 class="title">正式选房</h2>
            <div class="content-start">
              <span class="time-title">开始时间:</span>
              <span v-if="roomsHome.formal" class="time">{{roomsHome.formal.startTime | formatDate}}</span>
            </div>
            <div class="content-end">
              <span class="time-title">结束时间:</span>
              <span v-if="roomsHome.formal" class="time">{{roomsHome.formal.endTime | formatDate}}</span>
            </div>
          </div>
        </div>
        <div class="housetype">
          <h2 class="title">开盘户型</h2>
          <ul class="item-content">
            <li class="item-map" v-for="(item,index) of roomsHome.rooms">
              <img class="icon" preview="1" :preview-text="handleDesc(item)" :src="item.roomMap">
              <div class="name">{{item.title}}</div>
              <div class="desc">{{item.structure}} {{item.area}}平方</div>
              <div class="total">{{item.const}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { formatDate } from '#/js/date'
import { countDate } from '#/js/countdate'
import { mapMutations } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      roomsHome: {},
      newDate: {},
      isMask: true
    }
  },
  created() {
    this._getindexData()
  },
  methods: {
    //图片加载完成
    loadImage() {
      this._initScroll()
    },
    //初始化滚动
    _initScroll() {
      if (!this.indexScroll) {
        this.indexScroll = new BScroll(this.$refs.indexWrapper, { click: true })
      } else {
        this.indexScroll.refresh()
      }
    },
    //请求数据
    _getindexData() {
      this.$axios.get('/api/roomshome').then(res => {
        if (res.data.success) {
          this.roomsHome = res.data.data
          this.set_rooms_tel(res.data.data.tel)
          this.$nextTick(() => {
            this._initScroll()
            this.$previewRefresh()
            this.countDownBySecond()
          })
        }
      })
    },
    //接接描述
    handleDesc(item) {
      return `${item.title}  ${item.structure}  ${item.area}平方  ${
        item.const
      }套`
    },
    //倒计时函数
    countDownBySecond() {
      let targetDate = this.roomsHome.formal.startTime
      this.newDate = countDate(targetDate)
      if (!this.newDate) {
        return
      }
      this.timer = setInterval(() => {
        this.newDate = countDate(targetDate)
        if (!this.newDate) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    ...mapMutations({
      set_rooms_tel: 'SET_ROOMS_TEL'
    })
  },
  computed: {
    handleEndTime() {
      return Object.values(this.newDate).some(item => {
        return item !== 0
      })
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>


<style lang="stylus" scoped>
@import '~#/stylus/icon'
.index-wrapper
  position absolute
  top 0
  bottom 100px
  width 100%
  overflow hidden
  .index-header
    position relative
    width 100%
    height 360px
    overflow hidden
    .image
      height 100%
      width 100%
    .countdown
      display flex
      justify-content space-between
      position absolute
      width 100%
      height 80px
      line-height 80px
      bottom 0
      left 0
      background rgba(7, 17, 27, 0.7)
      font-size 0
      z-index 1
      .countdown-label
        flex 0 0 240px
        width 240px
        color #fff
        font-size 30px
        &:before
          display inline-block
          position relative
          top 5px
          margin 0 10px 0 20px
          content ' '
          width 38px
          height 38px
          background-image url($time)
          background-position 0 0
          background-repeat no-repeat
          background-size 38px 38px
      .countdown-time
        flex 1
        color #fff
        font-size 24px
        text-align center
        .time
          display inline-block
          width 76px
          height 68px
          margin 4px
          font-size 44px
          line-height 68px
          font-weight 700
  .content
    box-sizing border-box
    padding 16px
    width 100%
    .head
      display flex
      width 100%
      height 80px
      border-bottom 6px solid #0069b4
      box-sizing border-box
      .title
        flex 0 0 430px
        width 430px
        font-size 40px
        color #333
        line-height 80px
        text-align center
        font-weight 500
      .select-count
        flex 1
        height 80px
        line-height 80px
        font-size 26px
        color #fff
        text-align right
        padding-right 10px
        box-sizing border-box
        background-image url($countbg)
        background-repeat no-repeat
        background-size cover
        .count
          font-size 36px
          font-style normal
          font-weight 700
  .bulletin
    display flex
    flex-wrap wrap
    text-align center
    margin-top 20px
    .width-flex
      flex 0 0 12px
      width 10px
    .bulletin-right, .bulletin-left
      flex 1
      padding 20px
      background rgba(252, 99, 77, 0.2)
      border-radius 6px
      .title
        font-size 36px
        line-height 32px
        margin-bottom 16px
        color #666
      .content-start, .content-end
        font-size 0
        .time-title
          display inline-block
          font-size 22px
          color #666
        .time
          display inline-block
          font-size 22px
          line-height 40px
          color #666
  .housetype
    margin-top 40px
    .title
      font-size 40px
      line-height 40px
      font-weight 600
      color #666
    .item-content
      margin-top 40px
      display flex
      flex-flow wrap
      .item-map
        position relative
        flex 0 0 50%
        width 50%
        text-align center
        margin-bottom 60px
        .icon
          width 320px
          height 240px
        .name
          padding-left 40px
          text-align left
          line-height 40px
          font-size 34px
          margin-bottom 12px
          color #666
        .desc
          padding-left 40px
          text-align left
          font-size 28px
          color #999
        .total
          position absolute
          left 12px
          top -12px
          padding 0 14px
          background-color #0069b4
          color #fff
          text-align center
          font-size 28px
          line-height 40px
          &:before
            position absolute
            content ' '
            display block
            width 0
            height 0
            border-top 10px solid #0047a2
            border-left 20px solid transparent
            left 0
            top 39px
</style>

