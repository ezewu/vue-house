// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'
import store from './store'
import preview from 'vue-photo-preview'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client';
// import fastClick from 'fastclick'
import 'vue-photo-preview/dist/skin.css'
import '#/stylus/index'

// fastClick.attach(document.body)

let options = {
  // captionEl: false,
  shareEl: false,
  fullscreenEl: false,
  timeToIdle: 4000
}

Vue.use(preview, options)
Vue.use(VueSocketio, socketio('http://localhost:3000'))
Vue.config.productionTip = false
Vue.prototype.$axios = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
