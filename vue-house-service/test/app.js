const mongoose = require('mongoose')
const nanoid = require('nanoid')
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/mongodb_redis')


let mode = require('./roomlist')
let queryData = require('./push_roomlist')



let sleep = async(time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}


let builDing = [
  { 'builDingName': 1, 'builDingId': 'vu1vcegjj1', 'unitId': ['aoo3i72fe84', 'evn02pt6vcc'] },
  { 'builDingName': 2, 'builDingId': '6a1sshlrr7q', 'unitId': ['6h5q8zwvyj5', 'lnoo1pp1itr', 'm731eohrcsi', 'pxz3v7hv75'] },
  { 'builDingName': 3, 'builDingId': 'c20ymcflc6g', 'unitId': ['ejpachnu5sq', 'elj7mxoij7', '7wy4nxww5lp'] }
]

let roomNum = [4, 5, 6]
let builDingNum = [28, 29, 30, 31, 32, 33, 34]
let conut = 1

for (let i = 0; i < builDing.length; i++) {
  for (let j = 0; j < builDing[i].unitId.length; j++) {

    let roomLength = roomNum[Math.floor((Math.random() * roomNum.length))]
    let builLength = builDingNum[Math.floor((Math.random() * builDingNum.length))]

    for (let k = 0; k < roomLength * builLength;) {
      let builDingName = builDing[i].builDingName
      let builDingId = builDing[i].builDingId
      let unitId = builDing[i].unitId[j]
      let unitName = j + 1
      let tmpData = queryData(builDingName, builDingId, unitId, unitName, roomLength, k);

      (async() => {
        let monInsert = new mode(tmpData)
        let res = await monInsert.save()
      })()
      
      console.log(`插入第${conut++}条`)
      k++
    }

  }

}
