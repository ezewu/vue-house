const redis = require('redis')
const client = redis.createClient()

client.on('error', function(err) {
  console.log('Error ' + err)
})

exports.setHash = (key, obj) => {
  return new Promise((resolve, reject) => {
    client.hmset(key, obj, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

exports.getHash = (key) => {
  return new Promise((resolve, reject) => {
    client.hgetall(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

exports.getHashKeys = (key) => {
  return new Promise((resolve, reject) => {
    client.keys(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

// exports.getHashKeyss = (replies) => {
//   return new Promise((resolve, reject) => {
//     replies.forEach(function(reply, index) {
//       client.hgetall(reply, (err, res) => {
//         console.log(res)
//       })
//     })
//   })
// }


exports.getString = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

exports.setString = (key, val, time = false) => {
  return new Promise((resolve, reject) => {
    client.set(key, val, (err, res) => {
      if (time) {
        client.expire(key, time)
      }
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}
