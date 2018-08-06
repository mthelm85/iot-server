const LocalStrategy = require('passport-local').Strategy

module.exports = (passport, User) => {

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    console.log(req.body)
    process.nextTick(() => {
      User.findOne({
        'email': email
      }, (err, user) => {
        if (err) {
          return done(err)
        } else if (user) {
          return done(null, false)
        } else {
          var newUser = new User()
          newUser.email = email
          newUser.password = newUser.generateHash(password)
          newUser.save((err) => {
            if (err) {
              throw err
            } else {
              return done(null, newUser)
            }
          })
        }
      })
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({
      'email': email
    }, (err, user) => {
      if (err) {
        console.log('An error occurred.')
        return done(err)
      } else if (!user) {
        console.log('No user was found.')
        return done(null, false)
      } else if (!user.validPassword(password)) { 
        console.log('The password is wrong.')
        return done(null, false)
      } else {
        console.log('Successful login.')
        return done(null, user)
      }
    })
  }))

}
