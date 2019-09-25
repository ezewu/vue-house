const Router = require('koa-router')
const User = require('../controllers/user')
const Home = require('../controllers/home')
const Listing = require('../controllers/listing')

module.exports = (function() {
  let router = new Router({
    prefix: '/api/'
  })
  router.post('verify', User.hasBody, User.verify)
  router.get('roomshome', User.hasToken, Home.roomsHome)
  router.get('captcha', User.captcha)
  router.post('listing', Listing.list)
  router.get('roomListmongodb', Listing.roomListMongodb)
  router.post('uproom', Listing.upRoom)
  return router
})()
