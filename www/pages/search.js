import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import get from 'lodash/get';

import { fetchProviders } from '../src/store/actions/provider';
import { selectProvider } from '../src/selectors';

import Filter from '../src/components/filter';
import ProviderList from '../src/components/provider-list';

Search.getInitialProps = async ({ req, store }) => {
  await store.dispatch(fetchProviders());

  const state = store.getState();
  return { providers: get(state, 'provider.list') };
};

export default function Search() {
  const { list, isLoading, error } = useSelector(selectProvider);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>there's an error</p>;
  }

  if (!list) {
    return <p>no data</p>;
  }

  return (
    <Box>
      <Filter />
      <ProviderList providers={list} />
    </Box>
  );
}
