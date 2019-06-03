const { send } = require('micro');
const { router, get } = require('microrouter');

const connectDb = require('./db');
const Providers = require('./models/providers');

connectDb();

const notfound = (req, res) => {
  send(res, 404, 'Not found route');
};

const findProviders = async () => {
  const providers = Providers.find({ providerState: 'AL' });
  send(res, 200, providers);
};

module.exports = app;
module.exports = router(get('/', findProviders), get('/*', notfound));
