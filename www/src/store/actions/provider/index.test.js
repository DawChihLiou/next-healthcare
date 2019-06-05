import 'isomorphic-unfetch';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import * as actions from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Provider async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('create FETCH_PROVIDERS_SUCCESSFUL when fetching providers is done', () => {
    const mockData = {
      data: [
        {
          averageCoveredCharges: 4939.5,
          averageMedicarePayments: 2693,
          averageTotalPayments: 3817,
          drgDefinition: '203 - BRONCHITIS & ASTHMA W/O CC/MCC',
          hospitalReferralRegionDescription: 'AL - Dothan',
          providerCity: 'ELBA',
          providerId: 10027,
          providerName: 'ELBA GENERAL HOSPITAL',
          providerState: 'AL',
          providerStreetAddress: '987 DRAYTON STREET',
          providerZipCode: 36323,
          totalDischarges: 12,
          _id: '5cf3a33da9ba515548438211',
        },
      ],
    };

    fetchMock.mock('http://localhost:3001/api/providers?', mockData);

    const expectedActions = [
      { type: 'SET_FILTER', payload: {} },
      { type: 'FETCH_PROVIDERS_REQUESTED' },
      { type: 'FETCH_PROVIDERS_SUCCESSFUL', payload: mockData.data },
    ];
    const store = mockStore({ provider: { list: [] } });

    return store
      .dispatch(actions.fetchProviders({}, 'bearer tester'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
