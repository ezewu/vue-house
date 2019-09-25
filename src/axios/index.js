const ERR_TOKEN = 204
import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(
  config => {
    console.log('axios发起了请求')
    let token = window.localStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    console.log('axios请求完成')
    if (response.data.code === ERR_TOKEN) {
      window.localStorage.removeItem('token')
      router.replace({
        path: 'login'
      })
    }
    return response
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default axios
