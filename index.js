const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const app = next({ dev: !!process.env.DEVELOPMENT });
const handle = app.getRequestHandler();
const port = process.env.PORT || 8080;

const api = require('./api/index.js');
const cityResolver = require('./api/cityResolver');
const getBaseUrl = req => `${req.protocol}://${req.get('host')}`;

module.exports = app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.enable('trust proxy');

  server.use('/api/v1', api);

  server.get('/:city?', cityResolver, (req, res) => {
    return app.render(req, res, '/weather', {
      ...req.query,
      ...req.params,
      ...res.locals,
      baseUrl: getBaseUrl(req)
    });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
  return server;
});
