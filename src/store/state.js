let users = {}
try {
  let usre = window.localStorage.getItem('users')
  if (usre) {
    users = JSON.parse(usre)
  }
} catch (error) {
  console.log('获取用户信息出错')
}


let rooms_tel = ''
try {
  rooms_tel = window.localStorage.getItem('rooms_tel')
} catch (error) {
  console.log('获取楼盘电话出错')
}

const state = {
  users: users,
  rooms_tel: rooms_tel
}

export default state
