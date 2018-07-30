module.exports = (app, io) => {
  app.post('/api/post-weight', (req, res) => {
    io.sockets.emit('weight updated', req.body)
    res.json({ message: 'data was emitted to sockets' })
  })
}
