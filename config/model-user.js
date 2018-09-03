const mongoose = require('mongoose')
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

module.exports = mongoose.model('User', userSchema)
