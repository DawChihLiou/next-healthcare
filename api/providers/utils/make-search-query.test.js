const makeQuery = require('./make-search-query');

describe('Make search query utility function', () => {
  it('parse empty query params', () => {
    expect(makeQuery({})).toEqual({ where: {}, select: null });
  });

  it('parse query params', () => {
    const params = {
      state: 'ca',
      min_discharges: '0',
      max_discharges: '5000',
      min_average_covered_charges: '0',
      max_average_covered_charges: '5000',
      min_average_medicare_payments: '0',
      max_average_medicare_payments: '5000',
      return_fields: 'foo,boo',
    };
    const expected = {
      where: {
        providerState: 'CA',
        totalDischarges: { $gte: 0, $lte: 5000 },
        averageCoveredCharges: { $gte: 0, $lte: 5000 },
        averageMedicarePayments: { $gte: 0, $lte: 5000 },
      },
      select: 'foo boo',
    };
    expect(makeQuery(params)).toEqual(expected);
  });

  it('parse invalid query params', () => {
    const params = {
      state: 'ca',
      min_discharges: 'foo',
      max_discharges: 'foo',
      min_average_covered_charges: 'foo',
      max_average_covered_charges: 'foo',
      min_average_medicare_payments: 'foo',
      max_average_medicare_payments: 'foo',
      return_fields: 'foo,boo',
    };
    const expected = {
      where: {
        providerState: 'CA',
      },
      select: 'foo boo',
    };
    expect(makeQuery(params)).toEqual(expected);
  });
});

/**
 * 
    state,
    min_discharges,
    max_discharges,
    min_average_covered_charges,
    max_average_covered_charges,
    min_average_medicare_payments,
    max_average_medicare_payments,
    return_fields,
 */
