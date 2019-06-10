import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import { selectUser } from '../../selectors';
import { requestAuth, requestAuthFailed, authorize } from '../../store/actions';

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
    flexWrap: 'wrap',
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  cover: {
    width: '3em',
    height: '3em',
    margin: '0 auto',
  },
  borderRight: {
    borderRight: `1px solid ${theme.palette.grey[400]}`,
    paddingRight: '24px',
  },
  loginButton: {
    boxShadow: 'none !important',
  },
  loader: {
    margin: theme.spacing(1.5),
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleAuthRequest = useCallback(() => {
    dispatch(requestAuth());
  }, []);

  const handleAuthSuccess = useCallback(auth => {
    const data = {
      ...auth.profileObj,
      accessToken: auth.accessToken,
      expiresAt: auth.tokenObj.expires_at,
    };
    dispatch(authorize(data));
  }, []);

  const handleAuthFailure = useCallback(err => {
    dispatch(requestAuthFailed(err));
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
              image="static/logo.svg"
              title="Next Healthcare"
              className={classes.cover}
            />
          </CardContent>
          <CardContent className={classes.content}>
            {user.isLoading ? (
              <CircularProgress className={classes.loader} />
            ) : (
              <GoogleLogin
                clientId={
                  process.env.NODE_ENV === 'production'
                    ? '452779546633-d4b7j3lh7qstqvqrnprb8k22l6hg1c0c.apps.googleusercontent.com'
                    : '452779546633-mu0vkejvkapbdhbnmcnhs1itbroft6bc.apps.googleusercontent.com'
                }
                onRequest={handleAuthRequest}
                onFailure={handleAuthFailure}
                onSuccess={handleAuthSuccess}
                className={classes.loginButton}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
