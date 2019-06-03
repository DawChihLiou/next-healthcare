import { useCallback } from 'react';

import clsx from 'clsx';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { GoMarkGithub } from 'react-icons/go';

import LogoIcon from './svg/logo.svg';

const useStyles = makeStyles(theme => ({
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  fullHeight: {
    height: '100%',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
  },
  content: {
    flex: '1 0 auto',
    paddingTop: 0,
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  cover: {
    width: '3em',
    height: '3em',
  },
  borderRight: {
    borderRight: `1px solid ${theme.palette.grey[400]}`,
    paddingRight: '24px',
  },
}));

function Login({ url }) {
  const classes = useStyles();

  const handleLogin = useCallback(async () => {
    Router.push('/search');
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.fullHeight}
    >
      <Grid item>
        <Card className={classes.card}>
          <CardContent className={clsx(classes.content, classes.borderRight)}>
            <CardMedia
              image={LogoIcon}
              title="Next Healthcare"
              className={classes.cover}
            />
          </CardContent>
          <CardContent className={classes.content}>
            <Button onClick={handleLogin}>
              <span>Sign in with Github</span>
              <GoMarkGithub size="1.5em" className={classes.rightIcon} />
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;
