require('dotenv').config();

const { send } = require('micro');
const query = require('micro-query');
const compose = require('micro-compose');
const visualize = require('micro-visualize');
const { router, get } = require('microrouter');

const connectDb = require('./db');
const Providers = require('./models/providers');
const makeQuery = require('./utils/make-search-query');

connectDb();

const findProviders = async (req, res) => {
  try {
    const { where, select } = makeQuery(query(req));

    const providers = await Providers.find(where, select);
    send(res, 200, providers);
  } catch (error) {
    send(res, 500, error);
  }
};

module.exports = compose(
  visualize,
  router
)(get('/*', findProviders));
