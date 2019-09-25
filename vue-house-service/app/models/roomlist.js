const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const roomList = new mongoose.Schema({

  builDingID: String, //楼栋ID
  unitsID: String, //单元ID

  number: String, //房号
  totalPrice: String, //总价
  area: String, //面积

  builDingName: String, //楼栋名
  unitName: String, //单元名

  structure: String, //几室几厅(3室2厅)
  layoutName: String, //户型名称
  collectNum: Number, //收藏数

  order: String, //订购(是否内定)
  userId: String, //用户id
  status: String, //状态
  photos: Array, //详情页图片
  desc: String, //详情页描述
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

roomList.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { 'meta.updateAt': Date.now() } })
  next()
})

module.exports = mongoose.model('roomlist', roomList)
