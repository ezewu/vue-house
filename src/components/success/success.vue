<template>
  <div class="success">
    <div class="success-icon"></div>
    <div class="title">恭喜! 成功选定房源</div>
    <div class="numbering">房号为：1号楼1单元1903</div>
    <div @click.stop="handleSource" class="btn">查看我的房源</div>
  </div>
</template>

<script>
export default {
  name: 'success',
  methods: {
    handleSource() {
      this.$emit('source')
    }
  }
}
</script>


<style lang="stylus" scoped>
.success
  position absolute
  top 50%
  left 50%
  width 290px
  border-radius 4px 4px 0 0
  background #cf3c35
  transform translate(-50%, -50%)
  text-align center
  z-index 70
  .success-icon
    width 290px
    height 200px
    margin-top -100px
    background-image url('23ba0cfb3c45251e6cbea4eed324f2c4.png')
    background-position 0 0
    background-repeat no-repeat
    background-size cover
  .title
    margin-top 20px
    line-height 50px
    font-size 18px
    font-weight 700
    color #f9d857
  .numbering
    margin 0 40px
    height 40px
    line-height 40px
    font-size 16px
    color #ffe4aa
    background #f99d3a
  .btn
    margin-top 20px
    height 60px
    line-height 60px
    font-size 18px
    color #fff
    background #0069b4
</style>
