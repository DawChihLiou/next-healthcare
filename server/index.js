require('dotenv').config();

const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = require('./api');
const passport = require('./passport');

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
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(
      session({
        secret: 'nexthealthcare',
        resave: true,
        saveUninitialized: true,
      })
    );

    server.use('/api', router);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('Server is listening to port', port);
    });
  });
