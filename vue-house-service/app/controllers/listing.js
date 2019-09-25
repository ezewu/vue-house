const FloorList = require('../models/floorlist')
const RoomList = require('../models/roomlist')
const redis = require('../redis')

//查询楼栋单元
exports.list = async(ctx, next) => {
  let resFloorList = await FloorList.findOne({})
  if (resFloorList && Object.keys(resFloorList).length)
    ctx.body = {
      data: resFloorList
    }
}

//Mongodb查询
exports.roomListMongodb = async(ctx, next) => {
  let unitId = Number(ctx.query.unitId)
  let roomPerFloor = Number(ctx.query.roomPerFloor)
  let resRoomList = await RoomList.find({ unitId }).sort({ 'roomId': -1 })
  let tmpArr = []
  if (resRoomList && resRoomList.length) {
    let len = resRoomList.length
    for (let i = 0; i < len; i++) {
      if (i % roomPerFloor === 0) {
        tmpArr.push({
          roomList: resRoomList.slice(i, i + roomPerFloor).sort()
        })
      }
    }
  }
  ctx.body = {
    data: tmpArr
  }
}

//redis实时查询
exports.refrehRooms = async(unitId, roomPerFloor) => {
  let resKeyArr = await redis.getHashKeys(`unitId:${unitId}*`)
  let tmpArr = []
  let i = resKeyArr.length
  while (i--) {
    let resItemRoom = await redis.getHash(resKeyArr[i])
    let idx = Number(resItemRoom.floorName) - 1
    if (!tmpArr[idx]) {
      tmpArr[idx] = { roomList: [] }
    }
    resItemRoom.roomId = resKeyArr[i]
    tmpArr[idx].roomList.push(resItemRoom)
    if (tmpArr[idx].roomList.length === roomPerFloor) {
      tmpArr[idx].roomList.sort((a, b) => {
        return a.number - b.number
      })
    }

  }
  return tmpArr
}

exports.upRoom = async(ctx, next) => {
  let { _id } = ctx.request.body
  let resList = await RoomList.findOne({ _id })
  if (resList) {
    ctx.body = {
      success: true,
      msg: '查询成功',
      data: resList
    }
  } else {
    ctx.body = {
      success: false,
      msg: '查询失败'
    }
  }
}
