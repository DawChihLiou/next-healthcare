import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Comp from './index';

const mockStore = configureMockStore();

describe('Provider List', () => {
  it('should match Snapshot', () => {
    const store = mockStore({ user: {} });
    const { asFragment } = render(
      <Provider store={store}>
        <Comp />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
