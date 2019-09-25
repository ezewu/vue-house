const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/house-mongo')

const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const Listing = require('./app/controllers/listing')

app.keys = ['yftwuyouxin42018672102929web']
const CONFIG = {
  key: 'yftwuyouxinvue420',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}

app.use(session(CONFIG, app))
app.use(logger())
app.use(bodyParser())

app.use(async (ctx, next) => {
  if (ctx.url === '/favicon.ico') {
    return
  }
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log(`请求方式---${ctx.method}  请求路由---${ctx.url}  用时---${ms}ms`)
})

const routerApi = require('./app/router')

app
  .use(routerApi.routes())
  .use(routerApi.allowedMethods())

io.on('connection', function (socket) {

  socket.on('refrehRooms', async (data) => {
    let unitId = data.unitId
    let roomPerFloor = Number(data.roomPerFloor)
    let resData = await Listing.refrehRooms(unitId, roomPerFloor)
    socket.emit('newRooms', resData)
  })

})

server.listen(3000, () => {
  console.log('Listening: 3000')
})
