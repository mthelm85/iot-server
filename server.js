const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      express = require('express'),
      http = require('http'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      passport = require('passport'),
      session = require('express-session')

const app = express(),
      configDB = require('./config/dbUrl'),
      socketIO = require('socket.io'),
      secret = require('./config/secret'),
      server = http.createServer(app),
      port = process.env.PORT || 3000,
      User = require('./config/model-user')

const io = require('socket.io')(server)

// Include socket //
require('./socket.js')(io)

// Server Config//
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  credentials: true
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  secret: secret.secret,
  resave: false,
  saveUninitialized: false
}))

// Include passport
require('./config/passport')(passport, User)

// Include routes
require('./routes/routes.js')(app, passport)

// Connect to MongoDB
mongoose.connect(configDB.url, { useNewUrlParser: true })


server.listen(port)
console.log(`The magic happens on port ${port}`)
