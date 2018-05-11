const router = require('express').Router()
const Image = require('../models/Image')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/upload')

router
  .get('/', auth.checkToken, (req, res, next) => {
    Image.find()
      .populate('user')
      .exec()
      .then(images => {
        res.status(200).json({
          images
        })
      })
      .catch(error => next(error.errors))
  })
  .post('/', auth.checkToken, upload.uploadMem.single('photo'), upload.uploadGCS, (req, res, next) => {
    const id = req.user._id
    const imageURL = req.imageURL

    console.log(id, imageURL)
    
    Image.upsert({
      id,
      imageURL
    })
      .then(image => {
        res.status(200).json({
          image
        })
      })
      .catch(error => next(error.errors))
  })

module.exports = router