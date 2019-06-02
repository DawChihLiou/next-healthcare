import fetch from 'isomorphic-unfetch';

import { getRootUrl } from '../../../utils';

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
  const url = `${getRootUrl()}/api/providers`;
  console.log('url', url);

  dispatch(fetchProvidersRequested());

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    dispatch(fetchProvidersSuccessful(data));
  } catch (error) {
    dispatch(fetchProvidersFailed(error));
  }
};
