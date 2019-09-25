import * as types from './mutation-types'

const mutations = {
  [types.SET_USERS](state, users) {
    let toString = JSON.stringify(users)
    window.localStorage.setItem('users', toString)
    state.users = users
  },

  [types.SET_TEL](state, rooms_tel) {
    window.localStorage.setItem('rooms_tel', rooms_tel)
    state.rooms_tel = rooms_tel
  }
}



export default mutations
