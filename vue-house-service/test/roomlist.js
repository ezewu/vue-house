const mongoose = require('mongoose')
const redis = require('./redisdb')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const roomList = new mongoose.Schema({

  builDingId: String, //楼栋ID
  unitId: String, //单元ID

  floorName: String,//楼层
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



roomList.pre('findOneAndUpdate', function (next) {
  this.update({}, { $set: { 'meta.updateAt': Date.now() } })
  next()
})

roomList.pre('save', function (next) {
  if (this.isNew) {
    let key = `unitId:${this.unitId}:floorName:${this.floorName}:roomId:${this._id}`
    let totalPrice = this.totalPrice / 10000

    let obj = {
      number: this.number,
      status: this.status,
      area: this.area,
      totalPrice: totalPrice.toFixed(2),
      floorName: this.floorName
    }
    redis.setHash(key, obj)
  }
  next()
})


module.exports = mongoose.model('roomlist', roomList)
