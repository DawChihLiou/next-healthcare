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

import { selectProvider } from '../src/selectors';
import { fetchProviders } from '../src/store/actions/provider';

import Filter from '../src/components/filter';
import ProviderList from '../src/components/provider-list';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  return { providers: selectProvider(state) };
};

export default function Search() {
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
      return <p>There's an error. Please try again.</p>;
    }

    if (isEmpty(list)) {
      return (
        <p>
          No data found with your filter criteria. Please adjust and try again
        </p>
      );
    }

    return <ProviderList providers={list} />;
  }, [isLoading, error, list]);

  return (
    <Box>
      <Hidden xsDown>
        <Container maxWidth={false} className={classes.container}>
          <Container>
            <Filter done={toggleDrawer(false)} />
          </Container>
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
          <Filter done={toggleDrawer(false)} />
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
