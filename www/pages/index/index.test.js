import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import Page from './index';

const mockStore = configureMockStore();

describe('Index page', () => {
  it('should match Snapshot', () => {
    const store = mockStore({
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
    });
    const { asFragment } = render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
