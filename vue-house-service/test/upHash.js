const redis = require('redis')
const client = redis.createClient()

let getRandomKey = () => {
  return new Promise((resolve, reject) => {
    client.randomkey((err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

let upHash = (key) => {
  return new Promise((resolve, reject) => {
    client.hmset(key, { status: '3' }, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}


let getHashKeys = (key) => {
  return new Promise((resolve, reject) => {
    client.keys(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}



let sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 0)
  })
}

// ;
// (async() => {
//   let randomKey = await getHashKeys('unitId:336*')
//   for (let i = 0; i < randomKey.length;) {
//     let resUpHash = await upHash(randomKey[i])
//     console.log(resUpHash)
//     await sleep()
//     i++
//   }
// })()

;
(async() => {
  let randomKey = await getHashKeys('unitId:*')
  console.log(`${randomKey.length}条数据`)
  let j = 0
  let k = 0
  for (let i = 0; i < randomKey.length;) {
    try {
      let resUpHash = await upHash(randomKey[i])
      j++
      // console.log(`${i}条数据更新成功`)
    } catch (e) {
      // console.log(`${i}条数据更新失败---------------------`)
      k++
    }

    await sleep()
    if (i % 3) {
      i += 2
    } else {
      i++
    }
  }
  console.log(`${j}条数据更新成功`)
  console.log(`${k}条数据更新成功`)
})()
