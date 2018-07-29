const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const app = next({ dev: true });
const handle = app.getRequestHandler();

const api = require('./api/index.js');

module.exports = app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.use('/api/v1', api);
  server.get('/:city?', (req, res) => {
    return app.render(req, res, '/', {...req.query, ...req.params });
  });

  server.get('*', (req, res) => handle(req, res));
  // server.enable('trust proxy');

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
  return server;
});
