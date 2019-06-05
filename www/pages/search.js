import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogout } from 'react-google-login';
import Router from 'next/router';

import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import FilterListIcon from '@material-ui/icons/FilterList';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  selectProvider,
  selectFilterSettings,
  selectFilter,
} from '../src/selectors';
import { setUser } from '../src/store/actions';
import { fetchProviders } from '../src/store/actions/provider';

import Filter from '../src/components/filter';
import ProviderList from '../src/components/provider-list';

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
  },
  logoutButton: {
    boxShadow: 'none !important',
  },
}));

Search.getInitialProps = async ({ req, store }) => {
  const state = store.getState();
  return {
    settings: selectFilterSettings(state),
  };
};

export default function Search({ settings }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(selectProvider);
  const filter = useSelector(selectFilter);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const user = cookies.get('nextcare');

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(fetchProviders(filter, get(user, 'accessToken')));
  }, []);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleLogout = useCallback(() => {
    const cookies = new Cookies();
    cookies.remove('nextcare', { path: '/' });
    Router.push('/');
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Grid container className={classes.centeredContainer}>
          <CircularProgress />
        </Grid>
      );
    }

    if (error) {
      return (
        <Grid container className={classes.centeredContainer}>
          <p>There's an error. Please try again.</p>
        </Grid>
      );
    }

    if (isEmpty(list)) {
      return (
        <Grid container className={classes.centeredContainer}>
          <p>
            No data found with your filter criteria. Please adjust and try again
          </p>
        </Grid>
      );
    }

    return (
      <Grid container className={classes.centeredContainer}>
        <Hidden smUp>
          <GoogleLogout
            clientId={
              process.env.NODE_ENV === 'production'
                ? '452779546633-d4b7j3lh7qstqvqrnprb8k22l6hg1c0c.apps.googleusercontent.com'
                : '452779546633-mu0vkejvkapbdhbnmcnhs1itbroft6bc.apps.googleusercontent.com'
            }
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onLogoutFailure={noop}
            className={classes.logoutButton}
          />
        </Hidden>
        <ProviderList providers={list} />;
      </Grid>
    );
  }, [isLoading, error, list]);

  return (
    <Box>
      <Hidden xsDown>
        <Container maxWidth={false} className={classes.container}>
          <Filter done={toggleDrawer(false)} settings={settings} />
        </Container>
      </Hidden>

      {content}

      <Hidden smUp>
        <SwipeableDrawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Filter done={toggleDrawer(false)} settings={settings} />
        </SwipeableDrawer>
        <Fab
          color="primary"
          aria-label="Filter"
          className={classes.fab}
          onClick={toggleDrawer(true)}
        >
          <FilterListIcon />
        </Fab>
      </Hidden>
    </Box>
  );
}
