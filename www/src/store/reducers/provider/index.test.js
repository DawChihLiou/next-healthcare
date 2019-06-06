import reducer, { initialState } from './index';

describe('Privder reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: 'test' })).toEqual(initialState);
  });

  it('should handle FETCH_PROVIDERS_REQUESTED', () => {
    expect(
      reducer(initialState, {
        type: 'FETCH_PROVIDERS_REQUESTED',
      })
    ).toEqual({
      list: null,
      isLoading: true,
      error: null,
    });
  });

  it('should handle FETCH_PROVIDERS_SUCCESSFUL', () => {
    expect(
      reducer(initialState, {
        type: 'FETCH_PROVIDERS_SUCCESSFUL',
        payload: [],
      })
    ).toEqual({
      list: [],
      isLoading: false,
      error: null,
    });
  });

  it('should handle FETCH_PROVIDERS_FAILED', () => {
    const error = new Error();
    expect(
      reducer(initialState, {
        type: 'FETCH_PROVIDERS_FAILED',
        payload: error,
      })
    ).toEqual({
      list: null,
      isLoading: false,
      error: error,
    });
  });
});
