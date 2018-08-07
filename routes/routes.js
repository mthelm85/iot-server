module.exports = (app, passport, User) => {

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

  app.post('/register', isLoggedIn, (req, res) => {
    let query = { email: req.body.email }
    User.findOne(query, (err, user) => {
      if (err) {
        res.json({ message: 'Error' })
      } else if (user) {
        user.kegs.push({ name: req.body.name, id: req.body.id })
        user.save()
        res.json({ message: 'Scale registered' })
      }
    })
  })

}
