require('dotenv').config();

const { send } = require('micro');
const { router, get } = require('microrouter');

const connectDb = require('./db');
const Providers = require('./models/providers');

connectDb();

const notfound = (req, res) => {
  send(res, 404, 'Not found route');
};

const findProviders = async (req, res) => {
  try {
    // TODO remove limit
    const providers = await Providers.find({ providerState: 'AL' }).limit(20);
    send(res, 200, providers);
  } catch (error) {
    send(res, 500, error);
  }
};

module.exports = router(get('/*', findProviders));
