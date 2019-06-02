import { useCallback } from 'react';
import fetch from 'isomorphic-unfetch';
import clsx from 'clsx';
import Router from 'next/router';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { GoMarkGithub } from 'react-icons/go';

import { useStyles } from './hooks';

import LogoIcon from './svg/logo.svg';

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
