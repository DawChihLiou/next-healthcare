const mongoose = require('mongoose');

function initMongoose() {
  mongoose.connect(
    `mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}${
      process.env.MLAB_URL
    }`,
    {
      useNewUrlParser: true,
    }
  );

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('database connected successfully.');
  });
}

module.exports = initMongoose;
