const mongoose = require('mongoose');
const schema = mongoose.Schema;

const User = new schema({
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
