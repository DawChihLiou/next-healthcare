const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  email: String,
  familyName: String,
  givenName: String,
  googleId: String,
  imageUrl: String,
  name: String,
  accessToken: String,
});

const init = () => {
  if (mongoose.models.User) {
    return mongoose.model('users');
  }
  return mongoose.model('users', User);
};

module.exports = init();
