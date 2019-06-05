import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';

import { getRootUrl } from '../../../utils';

export const requestAuth = () => ({
  type: 'AUTH_REQUESTED',
});

export const requestAuthSuccessful = payload => ({
  type: 'AUTH_SUCCESSFUL',
  payload,
});

export const setUser = requestAuthSuccessful;

export const requestAuthFailed = payload => ({
  type: 'AUTH_FAILED',
  payload,
});

export const authorize = payload => async dispatch => {
  const url = `${getRootUrl()}/api/auth`;
  const cookies = new Cookies();

  dispatch(requestAuth());

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    dispatch(requestAuthSuccessful(payload));
    Router.push('/search');
    cookies.set('nextcare', payload, { path: '/' });
  } catch (err) {
    dispatch(requestAuthFailed(err));
  }
};
