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
  loginButton: {
    boxShadow: 'none !important',
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleAuthRequest = useCallback(() => {
    dispatch(requestAuth());
  }, []);

  const handleAuthSuccess = useCallback(user => {
    const data = { ...user.profileObj, accessToken: user.accessToken };
    dispatch(authorize(data));
  }, []);

  const handleAuthFailure = useCallback(({ details }) => {
    dispatch(requestAuthFailed(details));
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
            {user.isLoading ? (
              <CircularProgress />
            ) : (
              <GoogleLogin
                clientId={
                  process.env.NODE_ENV === 'production'
                    ? process.env.GOOGLE_CLIENT_ID
                    : process.env.DEV_GOOGLE_CLIENT_ID
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
