const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const roomsHome = new mongoose.Schema({
  // 首面图片
  indexImg: String,
  // 楼盘名
  title: String,
  //总套数
  count: Number,
  //楼盘电话
  tel:String,
  //测试时间
  test: {
    startTime: Date,
    endTime: Date
  },
  //正试选房时间
  formal: {
    startTime: Date,
    endTime: Date
  },
  rooms: Array,
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

roomsHome.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { 'meta.updateAt': Date.now() } })
  next()
})

module.exports = mongoose.model('roomsHomes', roomsHome)
