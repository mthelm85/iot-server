module.exports = (app, passport) => {

  app.post('/signup', passport.authenticate('local-signup', {}), (req, res) => {
    console.log(req.body)
    res.json({ success: 'yes' })
  })

  app.post('/login', passport.authenticate('local-login', {}), (req, res) => {
  res.json({ success: 'yes' })
})

}
