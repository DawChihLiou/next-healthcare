require('dotenv').config();

const { send } = require('micro');
const query = require('micro-query');
const compose = require('micro-compose');
const visualize = require('micro-visualize');
const { router, get } = require('microrouter');
const nth = require('lodash/nth');

const connectDb = require('../db');
const Providers = require('../models/providers');
const Users = require('../models/users');
const makeQuery = require('./utils/make-search-query');

connectDb();

const parseAuthorization = req => {
  if (!req.headers.authorization) {
    return;
  }

  const header = req.headers.authorization.split(' ');

  if (nth(header).toLowerCase() === 'bearer') {
    return nth(header, 1);
  }
};

const findProviders = async (req, res) => {
  try {
    const accessToken = parseAuthorization(req);
    const { where, select } = makeQuery(query(req));

    const user = await Users.findOne({ accessToken });

    if (!user) {
      send(res, 401, { error: { details: 'Unauthorized' } });
      return;
    }

    const providers = await Providers.find(where, select);

    send(res, 200, { data: providers });
  } catch (error) {
    send(res, 500, { error: { details: error } });
  }
};

module.exports = compose(
  visualize,
  router
)(get('/*', findProviders));
