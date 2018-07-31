const express = require('express')
const next = require('next')
const app = next({ dev: !!process.env.DEVELOPMENT })
const handle = app.getRequestHandler()
const port = process.env.PORT || 8080

const api = require('./api/index.js')
const cityResolver = require('./api/middlewares/city')

module.exports = app.prepare().then(() => {
  const server = express()

  server.enable('trust proxy')

  server.use('/api/v1', api)

  server.get('/:city?', cityResolver, (req, res) => {
    return app.render(req, res, '/weather', {
      ...req.query,
      ...req.params,
      ...res.locals
    })
  })

  server.get('*', (req, res) => handle(req, res))
  server.on('error', (err) => {
    console.error(err)
  })
  server.listen(port, (err) => {
    if (err) throw err
    console.log('Server ready on http://localhost:3000')
  })
  return server
})
