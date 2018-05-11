const mongoose = require('mongoose')
const validator = require('validator')
const UIDGenerator = require('uid-generator')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    validate: {
      validator: function (value) {
        return validator.isEmail(value)
      },
      message: 'not a valid email'
    }
  },
  uid: {
    type: String
  }
}, {
  timestamps: true
})

userSchema
  .path('email')
  .validate(function (value) {
    const self = this

    this.constructor
      .findOne({ email: value}, function (err, user) {
        if (err) return false
        
        if (user) {
          if (self.id === user.id) return true
          else return false
        } else return true
      })
  },'email is already used')

userSchema.pre('save', function (next) {
  new UIDGenerator().generate((err, uid) => {
    if (err) return next('failed generating uid')
    else {
      this.uid = uid
      next()
    }
  })
})

userSchema.statics.upsert = function ({email, name}) {
  return new Promise((resolve, reject) => {

    // custom failed validation message
    // since validation is no executed 
    // before this static method
    if (!email) return reject({ email: {
      message: 'email is required'
    }})

    this.findOne({ email })
      .exec()
      .then((user) => {
        if (user) resolve(user)
        else this.create({
          email,
          name
        })
          .then(user => resolve(user))
          .catch(error => reject(error.errors))
      })
      .catch(error => reject(error.errors))
  })
}

module.exports = mongoose.model('User', userSchema)