import { useMemo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import nth from 'lodash/nth';

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

import { fetchProviders } from '../../../src/store/actions/provider';
import { selectFilter } from '../../../src/selectors';

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
  const [values, setValues] = useState({
    ...filter,
  });
  const [returnFields, setReturnields] = useState([]);

  useEffect(() => {
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
  }, [settings]);

  const apply = useCallback(payload => dispatch(fetchProviders(payload)), []);

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
                  {options.map(({ value, name }) => (
                    <MenuItem key={`filter-option-${value}`} value={value}>
                      {name}
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
