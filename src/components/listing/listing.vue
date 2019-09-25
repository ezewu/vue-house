<template>
  <div class="listing">
    <div class="house-wrapper">
      <div class="house-left">
        <div v-if="builDing.length" @click="handleSelectHouse(index)" class="item" :class="{'active':builDingActiveIndex === index}" v-for="(item,index) of builDing">{{item.builDingName}}号楼</div>
      </div>
      <div @click="hadnleNoSelect" class="house-right">
        <span class="house-icon" :class="toggleActive"></span>
        <span class="house-text">只看未选</span>
      </div>
    </div>
    <div class="unites-wrapper">
      <div class="item" :class="{'active':unitsActiveIndex === index}" @click="hadnleSelectUnit(index)" v-for="(item,index) of unitsName">{{item.unitName}}单元</div>
    </div>
    <div class="floor-wrapper" ref="floorWrapper">
      <ul>
        <li v-for="(items,index) of roomslist" :key="items.roomList[0].floorName">
          <div class="num-content">
            <span class="num-icon"></span>
            <h2 class="item-num">第{{items.roomList[0].floorName}}层</h2>
          </div>
          <div class="floor-content">
            <div v-show="handleNoSelectShow(item.status)" @click.stop="handleSelectItem(item.status,item.roomId)" :style="hadnleSetWidth" :class="{'lowcolor':item.status ==='3'}" class="floor-item" v-for="item of items.roomList" :key="item.roomId">
              <h3 class="number">{{item.number}}</h3>
              <h5 class="totalPrice">{{item.totalPrice}}万</h5>
              <h5 class="area">{{item.area}}㎡</h5>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fold">
      <div class="shopcart-list" @click.stop="handleHideShopCart" v-show="listShow">
        <div class="house-source-pop">
          <div class="title-wrapper">
            <h2 class="title-left">{{listName}}</h2>
            <div class="title-right" @click="handleToDesc">
              <span class="text">查看详情</span>
              <span class="icon"></span>
            </div>
          </div>
          <div class="desc-wrapper">
            <div class="area-content">
              <div class="left">
                <div class="title">房源单价:</div>
                <div class="desc">165485元/㎡</div>
              </div>
              <div class="right">
                <div class="title">户型结构:</div>
                <div class="desc">{{list.structure}}</div>
              </div>
            </div>
            <div class="hx-content">
              <div class="left">
                <div class="title">户型名称:</div>
                <div class="desc">{{list.layoutName}}</div>
              </div>
              <div class="right">
                <div class="title">收藏次数:</div>
                <div class="desc">{{list.collectNum}}次</div>
              </div>
            </div>
          </div>
          <div class="grab-wrapper">
            <div class="so-content">
              <span class="icon"></span>
              <span class="text">收藏</span>
            </div>
            <div class="btn-content">
              <div class="btn-text">立即抢房</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <v-desc @collect="handleCollect" ref="desc"></v-desc>
    <!-- <selecting></selecting> -->
  </div>

</template>


<script>
const STATUS = '3'
const ERR_OK = 200
const DEFAULT_INDEX = 0
import BScroll from 'better-scroll'
import VDesc from '@/desc/desc'
import selecting from '@/selecting/selecting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      listShow: false,
      builDingActiveIndex: 0,
      unitsActiveIndex: 0,
      roomPerFloor: 4,
      noSelectShow: true,
      builDing: [],
      units: [],
      roomslist: [],
      list: {}
    }
  },
  created() {
    this._currData()
  },
  sockets: {
    connect: function() {
      this.id = this.$socket.id
    },
    newRooms: function(val) {
      this.roomslist = this._roomListArrSort(val)
      this._initFloorScroll()
    }
  },
  methods: {
    //发送请求楼层跟单元
    _currData() {
      this.$axios.post('/api/listing').then(res => {
        if (res.status == ERR_OK) {
          this.builDing = res.data.data.builDing
          this.units = res.data.data.units
          let unitId = this.units[DEFAULT_INDEX].unitId
          this.roomPerFloor = this.units[DEFAULT_INDEX].roomPerFloor
          this._getRooms(unitId, true)
        }
      })
    },
    _getRooms(unitId, isOne) {
      if (!isOne) {
        clearInterval(this.timer)
      }
      this._socketEmit(unitId)
      this.timer = setInterval(() => {
        this._socketEmit(unitId)
      }, 1000)
    },
    _socketEmit(unitId) {
      this.$socket.emit('refrehRooms', {
        roomPerFloor: this.roomPerFloor,
        unitId: unitId
      })
      this._initFloorScroll()
    },
    //楼层排序
    _roomListArrSort(arr) {
      return arr.sort((a, b) => {
        return b.roomList[0].floorName - a.roomList[0].floorName
      })
    },
    //滚动初始化
    _initFloorScroll() {
      if (!this.floorScroll) {
        this.$nextTick(() => {
          this.floorScroll = new BScroll(this.$refs.floorWrapper, {
            click: true
          })
        })
      } else {
        this.floorScroll.refresh()
      }
    },
    //选择楼栋
    handleSelectHouse(index) {
      this.builDingActiveIndex = index
      this.unitsActiveIndex = DEFAULT_INDEX
      let unitId = this.unitsName[DEFAULT_INDEX].unitId
      this.roomPerFloor = this.unitsName[DEFAULT_INDEX].roomPerFloor
      this._getRooms(unitId)
    },
    //选择单元
    hadnleSelectUnit(index) {
      let unitId = this.unitsName[index].unitId
      this.roomPerFloor = this.unitsName[index].roomPerFloor
      this.unitsActiveIndex = index
      this._getRooms(unitId)
    },
    //点击只看没有选的房间
    hadnleNoSelect() {
      this.noSelectShow = !this.noSelectShow
    },
    handleNoSelectShow(status) {
      return this.noSelectShow ? true : status !== STATUS
    },
    //点击房间
    handleSelectItem(status, roomId) {
      if (status && status === STATUS) {
        return
      }
      let self = this
      this.listShow = true
      let arr = roomId.split(':')
      let _id = arr[arr.length - 1]
      this.$axios.post('/api/uproom', { _id }).then(res => {
        this.list = res.data.data
      })
    },
    //隐藏抢房按键
    handleHideShopCart() {
      this.listShow = false
    },
    handleToDesc() {
      this.$refs.desc.handleShow()
    },
    handleCollect() {
      this.listShow = false
    }
  },
  computed: {
    unitsName() {
      let builDingId = this.builDing[this.builDingActiveIndex]
      return this.units.filter(item => {
        return item.buildingId === builDingId.builDingId
      })
    },
    hadnleSetWidth() {
      let margin = (this.roomPerFloor - 1) * 15
      let setWidth = (710 - margin) / this.roomPerFloor
      return {
        width: `${setWidth / 40}rem`
      }
    },
    toggleActive() {
      return this.noSelectShow ? 'no-active' : 'active'
    },
    listName() {
      if (this.list.unitName) {
        return `${this.list.builDingName}栋${this.list.unitName}单元${
          this.list.number
        }`
      }else{
        return `${this.list.builDingName}栋${
          this.list.number
        }`
      }
    },
    ...mapGetters(['users', 'rooms_tel'])
  },
  components: {
    VDesc,
    selecting
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.listing
  position absolute
  top 100px
  left 0
  bottom 100px
  width 100%
  overflow hidden
  .house-wrapper
    display flex
    flex-wrap wrap
    padding 0 20px
    height 80px
    line-height 80px
    border-bottom 1px solid rgba(7, 17, 27, 0.2)
    font-size 38px
    color #333
    .house-left
      flex 1
      .item
        display inline-block
        margin-right 28px
        height 80px
        box-sizing border-box
        &.active
          border-bottom 6px solid #0069b4
          font-weight 500
          color #0069b4
    .house-right
      flex 0 0 180px
      min-width 180px
      height 80px
      line-height 80px
      font-size 0
      color #666
      .house-icon
        display inline-block
        line-height 80px
        vertical-align middle
        margin-right 8px
        &.no-active
          height 36px
          width 36px
          border 1px solid #d8d8d8
          border-radius 50%
          box-sizing border-box
        &.active
          width 36px
          height 36px
          background-position 0 40%
          background-repeat no-repeat
          background-size 36px
          background-image url($checked)
      .house-text
        display inline-block
        vertical-align middle
        font-size 32px
  .unites-wrapper
    display flex
    justify-content center
    margin-top 12px
    height 60px
    line-height 60px
    color #666
    .item
      margin-right 20px
      padding 0 30px
      border-radius 10px
      border 1px solid #d8d8d8
      font-size 26px
      &.active
        border 3px solid #0069b4
        color #333
  .floor-wrapper
    position absolute
    top 152px
    bottom 0
    width 100%
    overflow hidden
    padding 0 20px
    margin-bottom 28px
    color #444
    .num-content
      display flex
      height 76px
      line-height 76px
      .num-icon
        flex 0 0 36px
        width 36px
        height 80px
        background-position 0 40%
        background-repeat no-repeat
        background-size 30px
        background-image url($num)
      .item-num
        flex 1
        font-size 28px
    .floor-content
      width 100%
      font-size 0
      height 140px
      .floor-item
        display inline-block
        text-align center
        margin-right 15px
        border 2px solid #0069b4
        border-radius 12px
        box-sizing border-box
        &:last-child
          margin-right 0
        &.lowcolor
          border 1px solid #f00
          color #999
        .number
          line-height 70px
          font-size 40px
        .totalPrice, .area
          line-height 30px
          font-size 24px
  .shopcart-list
    position fixed
    top 100px
    bottom 0
    z-index 20
    width 100%
    background rgba(7, 17, 27, 0.3)
    &.fold-enter-active, &.fold-leave-active
      transition all 0.2s linear
    &.fold-enter, &.fold-leave-to
      opacity 0
    .house-source-pop
      position absolute
      left 0
      bottom 0
      width 100%
      background #fff
      .title-wrapper
        display flex
        height 92px
        line-height 92px
        padding 0 20px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.2)
        .title-left
          flex 1
          font-size 40px
        .title-right
          flex 0 0 160px
          width 160px
          font-size 0
          .text
            display inline-block
            vertical-align top
            font-size 30px
            color #333
          .icon
            display inline-block
            vertical-align top
            flex 0 0 30px
            width 30px
            height 92px
            background-position 0 50%
            background-repeat no-repeat
            background-size 28px
            background-image url($right_icon)
      .desc-wrapper
        padding 0 20px
        background #f3f5f7
        .area-content, .hx-content
          display flex
          height 100px
          line-height 100px
          .left, .right
            flex 1
            color #111
            .title
              display inline-block
              font-size 32px
              color #666
            .desc
              display inline-block
              font-size 30px
      .grab-wrapper
        display flex
        height 100px
        .so-content
          flex 0 0 160px
          width 160px
          text-align center
          .icon
            display block
            width 160px
            height 60px
            background-position 50%
            background-repeat no-repeat
            background-size 40px
            background-image url($collect)
          .text
            font-size 26px
            color #666
        .btn-content
          flex 1
          height 100px
          line-height 100px
          background #0069b4
          font-size 36px
          color #fff
          text-align center
</style>
