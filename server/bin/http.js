const http = require('http')
const app = require('../app')

const server = http.createServer(app)

server.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on ${(process.env.PORT ? process.env.PORT : 3000)}`)
})