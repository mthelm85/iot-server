const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const validator = require('validator')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minglength: 3,
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid e-mail'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  kegs: [{
    name: {
      type: String,
      default: 'name'
    },
    id: {
      type: String,
      default: 'id'
    },
    color: {
      type: Number,
      default: 0
    },
    tareWeight: {
      type: Number
    },
    fullWeight: {
      type: Number
    }
  }]
})

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
