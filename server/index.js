const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const router = require('../src/api');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  })
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use('/api', router);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('Server is listening to port', port);
    });
  });
