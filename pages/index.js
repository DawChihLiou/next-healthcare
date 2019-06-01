import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { GoMarkGithub } from 'react-icons/go';

const useStyles = makeStyles(theme => ({
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function Index() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Fab variant="extended" color="primary">
            <span>Sign in with Github</span>
            <GoMarkGithub size="1.5em" className={classes.rightIcon} />
          </Fab>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Index;
