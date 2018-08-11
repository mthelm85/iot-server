module.exports = (app, passport, User) => {

  // Authentication middleware
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.send({ authorized: 'no' })
    }
  }

  app.post('/signup', passport.authenticate('local-signup', {}), (req, res) => {
    res.json({ success: 'yes' })
  })

  app.post('/login', passport.authenticate('local-login', {}), (req, res) => {
  res.json({ success: 'yes' })
})

  // Register a new kegmo
  app.patch('/register', isLoggedIn, (req, res) => {
    let query = { email: req.body.email }
    User.findOne(query, (err, user) => {
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

  app.get('/logout', isLoggedIn, (req, res) => {
    req.logout()
    res.json({ success: 'yes' })
  })

  // Retrieve all registered kegmos
  app.get('/get-kegs', isLoggedIn, (req, res) => {
    let query = { email: req.query.email }
    User.findOne(query, (err, user) => {
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
  app.patch('/change-color', isLoggedIn, (req, res) => {
    let query = { email: req.body.email }
    User.findOne(query, (err, user) => {
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
  app.patch('/change-name', isLoggedIn, (req, res) => {
    let query = { email: req.body.email }
    User.findOne(query, (err, user) => {
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
  app.patch('/set-tare-weight', isLoggedIn, (req, res) => {
    let query = { email: req.body.email }
    User.findOne(query, (err, user) => {
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
  app.patch('/set-full-weight', isLoggedIn, (req, res) => {
    let query = { email: req.body.email }
    User.findOne(query, (err, user) => {
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
