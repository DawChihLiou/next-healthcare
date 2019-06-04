require('dotenv').config();

const { send, json } = require('micro');
const compose = require('micro-compose');
const visualize = require('micro-visualize');
const { router, post } = require('microrouter');

const connectDb = require('./db');
const Users = require('./models/users');

connectDb();

const handler = async (req, res) => {
  try {
    const body = await json(req);
    const user = await Users.findOneAndUpdate(
      { googleId: body.googleId },
      { accessToken: body.accessToken }
    );

    if (!user) {
      const newUser = new Users(body);
      const savedUser = await newUser.save();

      send(res, 200, savedUser);

      return;
    }

    send(res, 200, user);
  } catch (error) {
    send(res, 500, error);
  }
};

module.exports = compose(
  visualize,
  router
)(post('/*', handler));
