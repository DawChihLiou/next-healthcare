const mongoose = require('mongoose');

const connectDb = () => {
  const { MLAB_URL, MLAB_USERNAME, MLAB_PASSWORD } = process.env;
  const url = `mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}${MLAB_URL}`;

  console.log(
    '------------test--------------\n',
    MLAB_URL,
    MLAB_USERNAME,
    MLAB_PASSWORD,
    '\n------------------------------'
  );

  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(url, { useNewUrlParser: true });
  } catch (error) {
    throw error;
  }
};

module.exports = connectDb;
