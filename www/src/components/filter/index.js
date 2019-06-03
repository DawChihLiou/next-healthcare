import { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { selectFilterSettings, selectFilter } from '../../../src/selectors';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
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
}));

export default function Filter() {
  const classes = useStyles();
  const settings = useSelector(selectFilterSettings);
  const filter = useSelector(selectFilter);
  const [values, setValues] = useState({
    ...filter,
  });

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setValues(vals => ({
      ...vals,
      [name]: value,
    }));
  }, []);

  const filters = useMemo(
    () =>
      settings.map(({ name, display, options }) => {
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
                  value={values[name]}
                  id={name}
                  name={name}
                  label={display}
                  onChange={handleChange}
                />
              )}
            </FormControl>
          </Grid>
        );
      }),
    [values]
  );
  return (
    <Container className={classes.container}>
      <Grid container className={classes.gridContainer}>
        {filters}
      </Grid>
    </Container>
  );
}
