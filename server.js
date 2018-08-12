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
      MongoDBStore = require('connect-mongodb-session')(session),
      socketIO = require('socket.io'),
      secret = require('./config/secret'),
      server = http.createServer(app),
      port = process.env.PORT || 3000,
      User = require('./config/model-user')

const io = require('socket.io')(server)

// Connect to/configure MongoDB
mongoose.connect(configDB.url, { useNewUrlParser: true })
const store = new MongoDBStore({
  uri: configDB.url,
  collection: 'sessions'
})

store.on('connected', () => {
  store.client
})

store.on('error', (err) => {
  assert.ifError(err)
  assert.ok(false)
})

// Include socket //
require('./socket.js')(io)

// Server Config//
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
  origin:[
    'http://localhost:8080',
    'https://keg-level.herokuapp.com'
  ],
  methods:['GET','POST', 'PATCH'],
  credentials: true
}))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(session({
  // secret: secret.secret,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}))
app.use(passport.initialize())
app.use(passport.session())

// Include passport
require('./config/passport')(passport, User)

// Include routes
require('./routes/routes.js')(app, passport, User)


server.listen(port)
console.log(`The magic happens on port ${port}`)
