const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const morgan = require('morgan')

const app = express()
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000

require('./routes/open-routes.js')(app, io)

// Server //

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Socket //

io.on('connection', (socket) => {
  console.log('New user connected...')

  socket.on('weight', (data) => {
    socket.broadcast.emit('weightUpdate', data)
  })

  socket.on('getWeight', () => {
    socket.broadcast.emit('updateWeight')
  })

  socket.on('tare', () => {
    socket.broadcast.emit('tare')
  })

  socket.on('disconnect', () => {
    console.log('User disconnected...')
  })

})

server.listen(port)
console.log(`The magic happens on port ${port}`)
