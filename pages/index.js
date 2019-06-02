import Login from '../src/components/login';

Index.getInitialProps = ({ req }) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const authEndpoint = process.browser
    ? `${protocol}://${window.location.host}/api/v1.0/auth`
    : `${protocol}://${req.headers.host}/api/v1.0/auth`;

  return { authEndpoint };
};

export default function Index({ authEndpoint }) {
  return <Login url={authEndpoint} />;
}
