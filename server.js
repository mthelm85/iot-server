const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const morgan = require('morgan')

const app = express()
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000

// Server Config//

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Socket.io //

// handle incoming connections from clients
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)

  // once client connects, send them to the appropriate room
  socket.on('room', (roomId) => {
    socket.join(roomId)
  })

  // when scale sends weight and roomId, emit the weight to the room
  socket.on('weight', (data) => {
    socket.to(data.roomId).emit('weightUpdate', data.weight)
  })

  // when user sends tare request, emit to the scale
  socket.on('tare', () => {
    socket.broadcast.emit('tare')
  })

  // handle user disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected...')
  })

})

server.listen(port)
console.log(`The magic happens on port ${port}`)
