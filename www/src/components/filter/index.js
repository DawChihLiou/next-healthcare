import { useMemo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';
import nth from 'lodash/nth';
import Router from 'next/router';

import get from 'lodash/get';
import noop from 'lodash/noop';
import uniq from 'lodash/uniq';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';
import findIndex from 'lodash/findIndex';

import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { fetchProviders } from '../../store/actions/provider';
import { selectFilter, selectUser } from '../../selectors';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  item: {
    textAlign: 'center',
  },
  formControl: {
    width: `calc(100% - ${theme.spacing(4)}px)`,
    marginTop: theme.spacing(1),
  },
  select: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  centered: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  extended: {
    minWidth: `calc(100% - ${theme.spacing(4)}px)`,
  },
  logoutButton: {
    boxShadow: 'none !important',
    backgroundColor: '#ffc107 !important',
    '& > div': {
      backgroundColor: '#ffc107 !important',
    },
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Filter(props) {
  const { done, settings } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const user = useSelector(selectUser);
  const [values, setValues] = useState({
    ...filter,
  });
  const [returnFields, setReturnields] = useState([]);

  useEffect(() => {
    const appliedReturnField = get(filter, 'return_fields');

    if (appliedReturnField) {
      setReturnields(appliedReturnField.split(','));
      return;
    }

    const index = findIndex(
      settings,
      setting => setting.name === 'return_fields'
    );
    const found = nth(settings, index);

    if (!found) {
      return;
    }

    const fields = found.options.map(op => op.value);
    setReturnields(fields);
  }, []);

  const apply = useCallback(
    payload => dispatch(fetchProviders(payload, get(user, 'accessToken'))),
    [user]
  );

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    const isValid = flow([toNumber, isNumber]);
    const sanitize = flow([toNumber, toString]);

    if (name === 'state') {
      setValues(vals => ({
        ...vals,
        [name]: value,
      }));
      return;
    }

    if (isEmpty(value) || isValid(value)) {
      setValues(vals => ({
        ...vals,
        [name]: isEmpty(value) ? '' : sanitize(value),
      }));
    }
  }, []);

  const handleApply = useCallback(() => {
    const payload = { ...values, return_fields: uniq(returnFields).join(',') };

    apply(payload);
    done();
  }, [values, returnFields]);

  const handleChangeMultiple = useCallback(e => {
    const { value } = e.target;
    setReturnields(value);
  }, []);

  const handleLogout = useCallback(() => {
    const cookies = new Cookies();
    cookies.remove('nextcare', { path: '/' });
    Router.push('/');
  }, []);

  const filters = useMemo(() => {
    return settings.map(({ name, display, options, type }) => {
      return (
        <Grid
          key={`filter-${name}`}
          item
          xs={12}
          sm={6}
          md={4}
          className={classes.item}
        >
          <FormControl className={classes.formControl}>
            {options ? (
              <>
                <InputLabel htmlFor={name}>{display}</InputLabel>
                <Select
                  multiple={type === 'multiple-select'}
                  value={
                    type === 'multiple-select' ? returnFields : values[name]
                  }
                  inputProps={{
                    name,
                    id: name,
                  }}
                  onChange={
                    type === 'multiple-select'
                      ? handleChangeMultiple
                      : handleChange
                  }
                  className={classes.select}
                >
                  {options.map(({ value, name: displayName }) => (
                    <MenuItem key={`filter-option-${value}`} value={value}>
                      {displayName}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : (
              <TextField
                value={`${values[name]}`}
                id={name}
                name={name}
                label={display}
                onChange={handleChange}
                type={type}
              />
            )}
          </FormControl>
        </Grid>
      );
    });
  }, [settings, values, returnFields]);

  return (
    <>
      <Hidden xsDown>
        <HideOnScroll {...props}>
          <AppBar color="primary" position="relative">
            <Container>
              <Grid container className={classes.gridContainer}>
                <Grid item xs={12} className={classes.right}>
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
                </Grid>
                {filters}
                <Grid item xs={12} className={classes.right}>
                  <Button onClick={handleApply}>Apply</Button>
                </Grid>
              </Grid>
            </Container>
          </AppBar>
        </HideOnScroll>
      </Hidden>
      <Hidden smUp>
        <Grid container className={classes.gridContainer}>
          {filters}
          <Grid item xs={12} className={classes.centered}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={handleApply}
              className={classes.extended}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
}
