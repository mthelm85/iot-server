const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const morgan = require('morgan')

const app = express()
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000

// Include socket //

require('./socket.js')(io)

// Server Config//

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

server.listen(port)
console.log(`The magic happens on port ${port}`)
