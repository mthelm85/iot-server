module.exports = (io) => {

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
    socket.on('tare', (roomId) => {
      socket.to(roomId).emit('tare')
    })

    // handle user disconnections
    socket.on('disconnect', () => {
      console.log('User disconnected...')
    })

  })
}
