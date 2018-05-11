const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')

const imageRoutes = require('./routes/image')
const otherRoutes = require('./routes')

const app = express()
const dbUrl = 'mongodb+srv://akbarsahata:AkbarSahata0406@scripst-examples-nodejs-d3h11.mongodb.net/suratwasiat'
// const dbUrl = 'mongodb://localhost/suratwasiat'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(logger('dev'))

mongoose.connect(dbUrl, (err) => {
  if (!err) console.log('connected to database')
  else {
    console.error(err)
    process.exit(1)
  }
})

app.use('/', otherRoutes)
app.use('/api/image', imageRoutes)

app.use((err, req, res, next) => {
  const {
    status: errorCode,
    error: errorMessages
  } = err

  res.status(errorCode || 500).json({
    errorMessages
  })
})

module.exports = app