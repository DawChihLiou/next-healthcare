require('dotenv').config();

const { send } = require('micro');
const query = require('micro-query');
const { router, get } = require('microrouter');
const { isNaN, isEmpty, nth } = require('lodash');

const connectDb = require('./db');
const Providers = require('./models/providers');

connectDb();

const findProviders = async (req, res) => {
  try {
    const {
      state,
      min_discharges,
      max_discharges,
      min_average_covered_charges,
      max_average_covered_charges,
      min_average_medicare_payments,
      max_average_medicare_payments,
    } = query(req);
    const where = {};

    /**
     * totalDischarges: 12,
     * averageCoveredCharges: 20052.08,
     * averageMedicarePayments: 10236.33
     *
     * gte
     * lte
     */
    if (state) {
      where.providerState = state.toUpperCase();
    }

    if (min_discharges || max_discharges) {
      const condition = {};

      if (min_discharges && !isNaN(+min_discharges)) {
        condition.$gte = +min_discharges;
      }
      if (max_discharges && !isNaN(+max_discharges)) {
        condition.$lte = +max_discharges;
      }

      if (!isEmpty(condition)) {
        where.totalDischarges = condition;
      }
    }

    if (min_average_covered_charges || max_average_covered_charges) {
      const condition = {};

      if (min_average_covered_charges && !isNaN(+min_average_covered_charges)) {
        condition.$gte = +min_average_covered_charges;
      }
      if (max_average_covered_charges && !isNaN(+max_average_covered_charges)) {
        condition.$lte = +max_average_covered_charges;
      }

      if (!isEmpty(condition)) {
        where.averageCoveredCharges = condition;
      }
    }

    if (min_average_medicare_payments || max_average_medicare_payments) {
      const condition = {};

      if (
        min_average_medicare_payments &&
        !isNaN(+min_average_medicare_payments)
      ) {
        condition.$gte = +min_average_medicare_payments;
      }
      if (
        max_average_medicare_payments &&
        !isNaN(+max_average_medicare_payments)
      ) {
        condition.$lte = +max_average_medicare_payments;
      }

      if (!isEmpty(condition)) {
        where.averageMedicarePayments = condition;
      }
    }
    const providers = await Providers.find(where);
    send(res, 200, providers);
  } catch (error) {
    send(res, 500, error);
  }
};

module.exports = router(get('/*', findProviders));
