import clsx from 'clsx';

import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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

function handleAuthRequest() {
  console.log('auth requested');
}

function handleAuthSuccess(user) {
  console.log(user);
  Router.push('/search');
}

function handleAuthFailure({ error, details }) {
  console.log('auth failed');
}

export default function Login({ url }) {
  const classes = useStyles();

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
            <GoogleLogin
              clientId={
                process.env.NODE_ENV === 'production'
                  ? process.env.GOOGLE_CLIENT_ID
                  : process.env.DEV_GOOGLE_CLIENT_ID
              }
              onRequest={handleAuthRequest}
              onFailure={handleAuthFailure}
              onSuccess={handleAuthSuccess}
            />
            ,
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
