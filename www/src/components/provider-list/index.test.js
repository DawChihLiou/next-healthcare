import React from 'react';
import { render } from '@testing-library/react';

import Comp from './index';

describe('Provider List', () => {
  it('should match Snapshot', () => {
    const { asFragment } = render(<Comp />);
    expect(asFragment()).toMatchSnapshot();
  });
});
