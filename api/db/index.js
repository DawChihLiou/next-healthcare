const mongoose = require('mongoose');

const connectDb = () => {
  const { MLAB_URL, MLAB_USERNAME, MLAB_PASSWORD } = process.env;
  const url = `mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}${MLAB_URL}`;

  mongoose.Promise = global.Promise;
  mongoose.connect(url, { useNewUrlParser: true }).then(
    /* eslint no-console: ["error", { allow: ["log", "error"] }] */
    () => console.log('MongoDB connection established.'),
    err => console.error('MongoDB connection failed.', err)
  );
};

module.exports = connectDb;
