const mongoose = require('mongoose');

const url = `mongodb://healthcare:healthcare123@ds263876.mlab.com:63876/healthcare`;

const connectDb = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(url, { useMongoClient: true, useNewUrlParser: true });
};

module.exports = connectDb;
