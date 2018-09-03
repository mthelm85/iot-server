const bodyParser = require('body-parser'),
      cors = require('cors'),
      express = require('express'),
      firebase = require('firebase')
      http = require('http'),
      mongoose = require('mongoose'),
      morgan = require('morgan')
      app = express(),
      configDB = require('./config/dbUrl'),
      socketIO = require('socket.io'),
      server = http.createServer(app),
      port = process.env.PORT || 3000,
      User = require('./config/model-user')
      firebaseConfig = require('./config/firebase')
      io = require('socket.io')(server)

// Connect to MongoDB
mongoose.connect(configDB.url, { useNewUrlParser: true })

// Include socket
require('./socket.js')(io)

// Server Config
app.use(morgan('dev'))
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

// Firebase Config
const config = {
  // apiKey: firebaseConfig.apiKey,
  // authDomain: firebaseConfig.authDomain,
  // databaseURL: firebaseConfig.databaseURL,
  // projectId: firebaseConfig.projectId,
  // storageBucket: firebaseConfig.storageBucket,
  // messagingSenderId: firebaseConfig.messagingSenderId
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  databaseURL: process.env.firebaseDatabaseURL,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId
}

firebase.initializeApp(config)

// Include routes
require('./routes/routes.js')(app, firebase, User)

server.listen(port)
console.log(`The magic happens on port ${port}`)
