const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const floorList = new mongoose.Schema({
  // 楼栋
  builDing: Array,
  // 单元
  units: Array,
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

floorList.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { 'meta.updateAt': Date.now() } })
  next()
})

module.exports = mongoose.model('floorlist', floorList)
