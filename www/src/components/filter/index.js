import { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { selectFilterSettings, selectFilter } from '../../../src/selectors';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    padding: theme.spacing(2),
  },
  item: {
    textAlign: 'center',
  },
  formControl: {
    minWidth: `calc(100% - ${theme.spacing(4)}px)`,
    marginTop: theme.spacing(1),
  },
  select: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
    marginRight: theme.spacing(1),
  },
  centered: {
    textAlign: 'center',
  },
  extended: {
    minWidth: `calc(100% - ${theme.spacing(4)}px)`,
  },
}));

export default function Filter({ done }) {
  const classes = useStyles();
  const settings = useSelector(selectFilterSettings);
  const filter = useSelector(selectFilter);
  const [values, setValues] = useState({
    ...filter,
  });

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    const isValid = flow([toNumber, isNumber]);
    const sanitize = flow([toNumber, toString]);

    if (name === 'state' || isEmpty(value) || isValid(value)) {
      setValues(vals => ({
        ...vals,
        [name]: isEmpty(value) ? '' : sanitize(value),
      }));
    }
  }, []);
  console.log(values);

  const filters = useMemo(
    () =>
      settings.map(({ name, display, options, type }) => {
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
                    value={values[name]}
                    inputProps={{
                      name: 'state',
                      id: 'state',
                    }}
                    onChange={handleChange}
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
      }),
    [values]
  );
  return (
    <Grid container className={classes.gridContainer}>
      {filters}
      <Hidden smUp>
        <Grid item xs={12} className={classes.centered}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={done}
            className={classes.extended}
          >
            Apply
          </Button>
        </Grid>
      </Hidden>

      <Hidden xsDown>
        <Grid item xs={12} className={classes.right}>
          <Button color="primary" onClick={done}>
            Apply
          </Button>
        </Grid>
      </Hidden>
    </Grid>
  );
}
