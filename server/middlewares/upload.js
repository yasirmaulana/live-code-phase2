const Multer = require('multer')
const Storage = require('@google-cloud/storage')

const BUCKET_NAME = 'surat-wasiat'
const PROJECT_ID = 'akbarsahata-id'

const uploadMem = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const type = file.mimetype.split('/').shift()

    if (type != 'image') cb({ status: 400, error: 'filetype is not acceptabel' }, false)
    else cb(null, true)
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  }
})

const getPublicUrl = (filename) => `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`

const uploadGCS = (req, res, next) => {
  if (!req.file) return res.next({
    status: 500,
    error: 'failed uploading'
  })

  const storage = Storage({
    projectId: PROJECT_ID,
    keyFilename: 'akbarsahata-id-8309bb3bdfd5.json'
  })
  const bucket = storage.bucket(BUCKET_NAME)
  const filename = Date.now() + '.' + req.file.originalname.split('.').pop()
  const file = bucket.file(filename)
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    console.log('error uploading to GCS')
    console.log(err)
    next({
      status: 500,
      error: 'error uploading to GCS, see logs'
    })
  })

  stream.on('finish', () => {
    file.makePublic()
      .then(() => {
        req.imageURL = getPublicUrl(filename)
        next()
      })
  })

  stream.end(req.file.buffer)
}

module.exports = {
  uploadMem,
  uploadGCS
}