const User = require('../models/User')
const objectifyError = require('../helpers/objectifyError')

module.exports = {
  requestToken (req, res, next) {
    const {
      name,
      email
    } = req.body

    User.upsert({
      name, 
      email
    })
      .then(user => {
        res.status(200).json({
          user
        })
      })
      .catch(error => {
        next({
          status: 400,
          error: objectifyError(error)
        })
      })
  }
}