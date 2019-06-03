import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProviderList from '../src/components/provider-list';
import { fetchProviders } from '../src/store/actions/provider';

Search.getInitialProps = async ({ req, store }) => {
  // await store.dispatch(fetchProviders());
  // const state = store.getState();
  // return { providers: get(state, 'provider.list') };
};

export default function Search() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(state => state.provider);

  useEffect(() => {
    if (!list) {
      dispatch(fetchProviders());
    }
  }, [list]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>there's an error</p>;
  }

  if (!list) {
    return <p>no data</p>;
  }

  return <ProviderList providers={list} />;
}
