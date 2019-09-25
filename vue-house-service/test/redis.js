const redis = require('./redisdb')
const data = require('./push_roomlist')

let i = 0

;
(async() => {
  let times = setInterval(() => {
    let tmpData = data(i)
    if (!tmpData) {
      clearInterval(times)
      console.log('插入完成')
      return
    }
    console.log(`unitId:${tmpData.unitId}:floorName:${tmpData.floorName}:roomId:${tmpData.roomId}`)
    let res = redis.setHash(`unitId:${tmpData.unitId}:floorName:${tmpData.floorName}:roomId:${tmpData.roomId}`, tmpData)
    console.log(`插入${i+1}条`)
    i++
  }, 300)
})()
