import 'isomorphic-unfetch';
import forOwn from 'lodash/forOwn';

import { setFilter } from '../filter';
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

function makeRoute(url, options) {
  let query = '';

  forOwn(options, (value, key) => {
    query = `${query}&${key}=${value}`;
  });

  return `${url}?${query}`;
}

export const fetchProviders = (payload, token = '') => async dispatch => {
  const url = makeRoute(`${getRootUrl()}/api/providers`, payload);

  dispatch(setFilter(payload));
  dispatch(fetchProvidersRequested());

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    });
    const { data, error } = await response.json();
    if (error) {
      dispatch(fetchProvidersFailed(error));
    }

    if (data) {
      dispatch(fetchProvidersSuccessful(data));
    }
  } catch (error) {
    dispatch(fetchProvidersFailed(error));
  }
};
