import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import FilterListIcon from '@material-ui/icons/FilterList';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';

import { selectProvider, selectFilterSettings } from '../src/selectors';
import { fetchProviders } from '../src/store/actions/provider';

import Filter from '../src/components/filter';
import ProviderList from '../src/components/provider-list';

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
    marginTop: theme.spacing(4),
  },
}));

Search.getInitialProps = async ({ req, store }) => {
  await store.dispatch(fetchProviders(get(store.getState(), 'filter')));

  const state = store.getState();
  return {
    settings: selectFilterSettings(state),
  };
};

export default function Search({ settings }) {
  console.log(settings);
  const classes = useStyles();
  const { list, isLoading, error } = useSelector(selectProvider);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    return <ProviderList providers={list} />;
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
