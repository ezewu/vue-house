const RoomsHome = require('../models/roomshome')

exports.roomsHome = async(ctx, next) => {
  let resData = await RoomsHome.findOne({})
  if (resData && Object.keys(resData).length) {
    ctx.body = {
      success: true,
      msg: '查询成功',
      data: resData
    }
  } else {
    ctx.body = {
      success: false,
      msg: '查询失败',
    }
  }
}
