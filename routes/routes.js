module.exports = (app, firebase, User) => {

  const emailQuery = { email: req.body.email }

  // Authentication middleware
  const isAuthed = (req, res, next) => {
    let user = firebase.auth().currentUser
    if (user) {
      return next()
    } else {
      res.json({ Result: 'Not authorized' })
    }
  }

  app.post('/signup', (req, res) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => {
      res.json({ Result: 'User created successfully' })
      let newUser = new User()
      newUser.email = req.body.email
      newUser.save()
    })
    .catch((error) => {
      res.json({ Result: `${error.message}` })
    })
  })

  app.post('/login', (req, res) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => {
      res.json({ Result: 'Successful login' })
    })
    .catch((error) => {
      res.json({ Result: `${error.message}` })
    })
  })

  // Register a new kegmo
  app.patch('/register', isAuthed, (req, res) => {
    User.findOne(emailQuery, (err, user) => {
      if (err) {
        res.json({ message: 'Error' })
      } else if (user) {
        user.kegs.push({ name: req.body.name, id: req.body.id })
        user.save()
        res.json({ message: 'Scale registered' })
      } else if (!user) {
        res.json({ message: 'User not found' })
      }
    })
  })

  app.get('/logout', (req, res) => {
    firebase.auth().signOut()
    .then(() => {
      res.json({ Result: 'Successful logout' })
    })
    .catch((error) => {
      res.json({ Result: `${error.message}` })
    })
  })

  // Retrieve all registered kegmos
  app.get('/get-kegs', isAuthed, (req, res) => {
    User.findOne(emailQuery, (err, user) => {
      if (err) {
        res.json({ message: 'Error' })
      } else if (user) {
        res.json({ userKegs: user.kegs })
      } else if (!user) {
        res.json({ message: 'User not found' })
      }
    })
  })

  // Change beer color
  app.patch('/change-color', isAuthed, (req, res) => {
    User.findOne(emailQuery, (err, user) => {
      if (err) {
        res.json({ message: 'Error' })
      } else if (user) {
        user.kegs[req.body.keg].color = req.body.color
        user.save()
        res.json({ message: 'Color changed' })
      } else if (!user) {
        res.json({ message: 'User not found' })
      }
    })
  })

  // Change kegmo name
  app.patch('/change-name', isAuthed, (req, res) => {
    User.findOne(emailQuery, (err, user) => {
      if (err) {
        res.json({ message: 'Error' })
      } else if (user) {
        user.kegs[req.body.keg].name = req.body.name
        user.save()
        res.json({ message: 'Name changed' })
      } else if (!user) {
        res.json({ message: 'User not found' })
      }
    })
  })

  // Set tareWeight
  app.patch('/set-tare-weight', isAuthed, (req, res) => {
    User.findOne(emailQuery, (err, user) => {
      if (err) {
        res.json({ message: 'Error' })
      } else if (user) {
        user.kegs[req.body.keg].tareWeight = req.body.tareWeight
        user.save()
        res.json({ message: 'tareWeight set' })
      } else if (!user) {
        res.json({ message: 'User not found' })
      }
    })
  })

  // Set fullWeight
  app.patch('/set-full-weight', isAuthed, (req, res) => {
    User.findOne(emailQuery, (err, user) => {
      if (err) {
        res.json({ message: 'Error' })
      } else if (user) {
        user.kegs[req.body.keg].fullWeight = req.body.fullWeight
        user.save()
        res.json({ message: 'fullWeight set' })
      } else if (!user) {
        res.json({ message: 'User not found' })
      }
    })
  })

}
