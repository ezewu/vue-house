const crypto = require('crypto')
const KEY = 'wuyouxindeyou360yftyc'

exports.cipAseObj = (obj) => {
  let jsonStr = JSON.stringify(obj)
  let cipKey = crypto.createCipher('aes128', KEY)
  let encrypted = cipKey.update(jsonStr, 'utf8', 'hex')
  encrypted += cipKey.final('hex')
  return encrypted
}

exports.decipAseObj = (obj) => {
  let decipKey = crypto.createDecipher('aes128', KEY)
  let decryptedJSON = {}
  try {
    let tmp = decipKey.update(obj, 'hex', 'utf8')
    tmp += decipKey.final('utf8')
    decryptedJSON = JSON.parse(tmp)
  } catch (e) {
    decryptedJSON = false
  }
  return decryptedJSON
}
