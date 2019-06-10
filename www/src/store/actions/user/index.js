import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';
import get from 'lodash/get';

import { getRootUrl } from '../../../utils';

export const requestAuth = () => ({
  type: 'AUTH_REQUESTED',
});

export const requestAuthSuccessful = payload => ({
  type: 'AUTH_SUCCESSFUL',
  payload,
});

export const requestAuthFailed = payload => ({
  type: 'AUTH_FAILED',
  payload,
});

const cookies = new Cookies();

export const authorize = payload => async dispatch => {
  const url = `${getRootUrl()}/api/auth`;

  dispatch(requestAuth());

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    dispatch(requestAuthSuccessful(payload));
    Router.push('/search');
    cookies.set('nextcare', payload, {
      path: '/',
      expires: new Date(payload.expiresAt),
    });
  } catch (err) {
    dispatch(requestAuthFailed(err));
  }
};

export const checkUserInCookies = () => () => {
  const user = cookies.get('nextcare');
  const token = get(user, 'accessToken');
  const { pathname } = window.location;

  if (!token && pathname !== '/') {
    Router.push('/');
    return;
  }

  if (token && pathname !== '/search') {
    Router.push('/search');
  }
};
