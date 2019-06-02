import fetch from 'isomorphic-unfetch';

export const fetchProvidersRequested = () => ({
  type: 'FETCH_PROVIDERS_REQUESTED',
});

export const fetchProvidersSuccessful = payload => ({
  type: 'FETCH_PROVIDERS_SUCCESSFUL',
  payload,
});

export const fetchProvidersFailed = payload => ({
  type: 'FETCH_PROVIDERS_FAILED',
  payload,
});

export const fetchProviders = () => async dispatch => {
  const getProvidersEndpoint = `/api/v1.0/providers`;

  dispatch(fetchProvidersRequested());

  try {
    const response = await fetch(getProvidersEndpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    dispatch(fetchProvidersSuccessful(data));
  } catch (error) {
    dispatch(fetchProvidersFailed(error));
  }
};
