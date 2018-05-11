const router = require('express').Router()
const { requestToken } = require('../controllers/index.controller')

router
  .post('/request-token', requestToken)

module.exports = router