const User = require('../models/User')

module.exports = {
  checkToken (req, res, next) {
    const {
      authorization: uid
    } = req.headers
    
    if (!uid) return next({
      status: 400,
      error: 'authorization token is required'
    })

    User.findOne({ uid }, (error, user) => {
      if (error) return next({
        status: 500,
        error: 'failed query'
      })

      if (!user) return next({
        status: 400,
        error: 'uid invalid'
      })

      req.user = user

      next()
    })
  }
}