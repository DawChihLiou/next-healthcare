import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../src/selectors';

import Login from '../src/components/login';

Index.getInitialProps = ({ req, store }) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const authEndpoint = process.browser
    ? `${protocol}://${window.location.host}/api/v1.0/auth`
    : `${protocol}://${req.headers.host}/api/v1.0/auth`;

  return { authEndpoint };
};

export default function Index({ authEndpoint }) {
  const { accessToken } = useSelector(selectUser);

  useEffect(() => {
    if (accessToken) {
      Router.push('/search');
    }
  }, []);

  return <Login url={authEndpoint} />;
}
