import fetch from 'isomorphic-unfetch';
import ProviderList from '../src/components/provider-list';

Search.getInitialProps = async ({ req }) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  let data = [];

  const getProvidersEndpoint = process.browser
    ? `${protocol}://${window.location.host}/api/v1.0/providers`
    : `${protocol}://${req.headers.host}/api/v1.0/providers`;

  try {
    const response = await fetch(getProvidersEndpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    data = await response.json();
    console.log('data', data);
  } catch (error) {
    console.log('erro', error);
  }

  return { url: getProvidersEndpoint, providers: data };
};

export default function Search({ providers }) {
  return <ProviderList providers={providers} />;
}
