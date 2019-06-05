import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import Page from './index';

const mockStore = configureMockStore();
const state = {
  user: {
    accessToken: null,
    email: null,
    familyName: null,
    givenName: null,
    googleId: null,
    imageUrl: null,
    name: null,
    isLoading: false,
    error: null,
  },
  provider: {
    list: null,
    isLoading: false,
    error: null,
  },
  filter: {
    state: 'al',
    min_discharges: '0',
    max_discharges: '5000',
    min_average_covered_charges: '0',
    max_average_covered_charges: '5000',
    min_average_medicare_payments: '0',
    max_average_medicare_payments: '5000',
  },
  settings: {
    filter: {},
  },
};

describe('Search page', () => {
  xit('should match Snapshot', () => {
    const store = mockStore(state);
    const { asFragment } = render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
