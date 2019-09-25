<template>
  <transition name="protocol">
    <div class="protocol">
      <transition name="head">
        <div v-show="toggleShow" class="protocol-head">
          <span class="proj-name">[示例] 润湖翡翠公园</span>
          <span class="proj-title">-在线选房须知</span>
        </div>
      </transition>
      <div class="protocol-unit" :style="unitHeight" ref="protocolUnit">
        <div class="protocol-text">为保证购房人顺利通过xxx项目在线开盘系统进行选房，购房人需仔细阅读如下在线开盘须知，在平等自愿的前提下，与卖房人达成以下约定：</br>1、购房人已知悉并完全理解国家及xx市相关限购政策，购房人承诺符合xx市限购政策相关文件规定，具备选购本项目房屋的资格（最终购房资格以房管局备案审查为准）。</br>2、购房人知悉并同意参与本次在线开盘的条件是已签署xxx项目《诚意金缴纳确认书》，并已全款缴纳认筹金后方可参加本次活动。《诚意金缴纳确认书》的签订人与购房者必须一致，在购房者在线选房成功后签订《商品房买卖合同》时，不予更改前描已确定的内容。 </br>3、购房人在选房前已确定付款方式为：①一次性付款：签约当日付清总价100%；②按揭贷款：签约当日付清，剰余房屋余款由本人向银行申请贷款；购房人已知悉并同意，此付款方式在购房人签订《商品房买卖合同》时不予变更；若购房人变更付款方式的，无论购房人是否选房成功，出卖人均有权取消购房人选房资格。</br> 4、认购时间将由出卖人以电话或短信或微信通知的形式发出。购房人承诺《诚意金缴纳确认书》中所留联系方式真实有效，出卖人按上述方式发出通知即视为送达，因购房人留存联系信息有误或其他非出卖人原因导致的您未能收到上述通知的，出卖人不承担责任。</br> 5、购房人本人在选房前自行通过xxx项目在线开盘系统平台或向出卖方销售中心工作人员学习、了解并熟悉选定房源的流程和操作方式，如有任何疑问请及时与出卖方销售中心工作人员联系。 </br>6、购房人于指定时间内在网络平台进行在线选房操作，当操作成功后，已缴纳的诚意金自动转为认购定金，购房人已认购房源不更名、不换房、不退房。购房人须在选房成功后于当日内前往xxx项目售楼部签订《房屋认购合同》，并办理诚意金转定金的书面确 认手续（该书面确认手续是否办理不影响诚意金已转为定金的效力）。若购房人未在前述约定期限内至xxx项目售楼部签订《房屋认购合同》，视为自动放弃线上认购房源，出卖人有权将该房源另行出售并不退还购房人已交诚意金。 </br>7、在线开盘平台所示户型图及周边配套等相关信息仅为展示之用而非作为交付标准和交付依据，交付标准和交付依据最终以政府审批文件及商品房买卖合同约定为准。 </br>8、购房人应对其操作行为负责，因操作失误等造成的任何不利后果由购房人自行承担，出卖人不承担任何责任。选房过程中，可能因个人设备或网络故障等原因致使不能成功选房，购房人同意按照出卖人安排参与后续批次选房；非因购房人本人原因造成购房人未认购成功的，购房 人可于出卖人通知时间内根据《诚意金缴纳确认书》的相关约定前往本项目售楼部办理退款申请手续。 </br>9、购房人承诺所提供的资料中所涉及的文件、证件及有关附件均真实 有效，相关复印件与原件一致，并对因申请材料虚假所引发的一切后果承担全部法律责任。若购房人不具备购房资格，无论认购行为是否成 功，其认购结果均无效，出卖人有权重新处置该认购房源。 </br>10、购房人对上述条款已仔细阅读，并对上述内容及事琐无异议。
        </div>
      </div>
      <div class="bottom" v-if="oneButton">
        <div class="protocol-area">
          <span @click="hadnleSelect" :class="checkedClass" class="checked"></span>
          <span class="area-text">我已阅读并同意《在线选房须知》</span>
        </div>
        <div class="protocol-btn">
          <div @click="handleRefuse" class="btn refuse">取消</div>
          <div @click="handleOk" class="btn">确认</div>
        </div>
      </div>
      <div @click="handleBackTrack" class="oneButton" v-if="!oneButton">
        <div class="btn">返回</div>
      </div>
      <top-tip @hide="hadnleHide" ref="topTip" :tipText="tipText"></top-tip>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import TopTip from '@/top-tip/top-tip'
export default {
  data() {
    return {
      tipText: '请先阅读并且点击同意',
      checkedSelect: false,
      toggleShow: true,
      oneButton: true
    }
  },
  created() {
    this.oneButton = this.$route.params.oneButton
  },
  computed: {
    unitHeight() {
      if (this.oneButton) {
        return { bottom: `${240 / 40}rem` }
      } else {
        return { bottom: `${140 / 40}rem` }
      }
    },
    checkedClass() {
      if (this.checkedSelect) {
        return 'active'
      } else {
        return 'no-active'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll() {
      if (!this.unitScroll) {
        this.unitScroll = new BScroll(this.$refs.protocolUnit, { click: true })
      } else {
        this.unitScroll.refresh()
      }
    },
    hide() {
      this.showFlag = false
    },
    hadnleSelect() {
      this.checkedSelect = !this.checkedSelect
    },
    hadnleHide() {
      this.toggleShow = true
    },
    handleBackTrack() {
      this.$router.push('/me')
    },
    handleRefuse() {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    },
    handleOk() {
      if (this.checkedSelect) {
        this.$router.push('/index')
      } else {
        this.$refs.topTip.show()
        this.toggleShow = false
      }
    }
  },
  components: {
    TopTip
  }
}
</script>

<style lang="stylus" scoped>
@import '~#/stylus/icon'
.protocol
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background #fff
  overflow hidden
  text-align center
  z-index 20
  &.protocol-enter-active, &.protocol-leave-active
    transition all 0.3s linear
  &.protocol-enter, &.protocol-leave-to
    opacity 0
  .protocol-head
    width 720px
    height 114px
    margin 28px auto 0
    color #fff
    font-size 0
    box-sizing border-box
    background-image url($protocolHead)
    background-repeat no-repeat
    background-size cover
    &.head-enter-active, &.head-leave-active
      transition all 0.3s
    &.head-enter, &.head-leave-to
      opacity 0
    .proj-name
      display inline-block
      font-size 32px
      line-height 100px
    .proj-title
      display inline-block
      font-size 32px
      line-height 100px
  .protocol-unit
    position absolute
    top 150px
    left 0
    padding 0 40px
    overflow hidden
    .protocol-text
      font-size 32px
      text-align left
      color #666
      line-height 50px
      font-family monospace
      letter-spacing 6px
  .oneButton
    position fixed
    left 0
    bottom 0
    padding 40px
    height 168px
    box-sizing border-box
    width 100%
    .btn
      display block
      height 88px
      line-height 88px
      background #0069b4
      border-radius 4px
      text-align center
      color #fff
      font-size 32px
  .bottom
    position fixed
    left 0
    bottom 0
    padding 40px
    height 248px
    box-sizing border-box
    width 100%
    .protocol-area
      font-size 0
      margin-bottom 40px
      color #999
      .checked
        display inline-block
        vertical-align middle
        width 40px
        height 40px
        margin-right 10px
        &.no-active
          border 4px solid #d8d8d8
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
        font-size 28px
    .protocol-btn
      display flex
      flex-wrap wrap
      box-sizing border-box
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


