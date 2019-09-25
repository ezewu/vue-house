const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
  // 姓名
  name: {
    type: String,
    require: true
  },
  // 电话
  tel: {
    type: String,
    require: true
  },
  //身份证号
  idCard: {
    type: String,
    require: true
  },
  // 房间
  room: {
    roomId: {
      type: String,
      default: '没有房号'
    },
    roomIdAt: {
      type: Date,
      default: Date.now()
    }
  },
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

userSchema.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { 'meta.updateAt': Date.now() } })
  next()
})

module.exports = mongoose.model('users', userSchema)
