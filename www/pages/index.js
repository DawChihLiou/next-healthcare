import { useEffect } from 'react';
import get from 'lodash/get';
import Router from 'next/router';
import Cookies from 'universal-cookie';

import Login from '../src/components/login';

const cookies = new Cookies();

Index.getInitialProps = ({ req, store }) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const authEndpoint = process.browser
    ? `${protocol}://${window.location.host}/api/v1.0/auth`
    : `${protocol}://${req.headers.host}/api/v1.0/auth`;

  return { authEndpoint };
};

export default function Index({ authEndpoint }) {
  useEffect(() => {
    const user = cookies.get('nextcare');
    if (get(user, 'accessToken')) {
      Router.push('/search');
    }
  }, []);

  return <Login url={authEndpoint} />;
}
