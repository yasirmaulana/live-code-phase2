const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  url: String
}, {
  timestamps: true
})

imageSchema.statics.upsert = function (data) {
  const {
    id: user,
    imageURL: url
  } = data
  
  return new Promise((resolve, reject) => {
    this.findOne({ user })
      .exec()
      .then(image => {
        if (image) {
          this.findOneAndUpdate({
            user
          }, {
            $set: {
              url
            }
          })
            .exec()
            .then(image => resolve({
              _id: image._id,
              user: image.user,
              createdAt: image.createdAt,
              updatedAt: image.updatedAt,
              url: url
            }))
            .catch(() => reject({
              status: 500,
              error: 'error update data'
            }))
        } else {
          this.create({
            user,
            url
          })
            .then(image => resolve(image))
            .catch(() => reject({
              status: 500,
              error: 'error create data'
            }))
        }

      })
      .catch(() => reject({
        status: 500,
        error: 'failed query'
      }))
  })
}

module.exports = mongoose.model('Image', imageSchema)