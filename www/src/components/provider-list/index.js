import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ProviderList({ providers }) {
  const classes = useStyles();
  const list = useMemo(() => {
    if (!providers) {
      return null;
    }

    return providers.map(provider => (
      <Card key={provider._id} className={classes.card}>
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            gutterBottom
          >{`DGR: ${provider['drgDefinition']}`}</Typography>

          <Typography variant="body1" component="p">{`${
            provider['providerName']
          }`}</Typography>

          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            gutterBottom
          >{`${provider['providerStreetAddress']} ${
            provider['providerCity']
          }, ${provider['providerState']} ${provider['providerZipCode']}
            `}</Typography>
          <Grid container spacing={2}>
            <Grid item>{`${provider['providerId']}`}</Grid>
            <Grid item>{`${
              provider['hospitalReferralRegionDescription']
            }`}</Grid>
            <Grid item>{`${provider['totalDischarges']}`}</Grid>
            <Grid item>{`$${provider['averageCoveredCharges']}`}</Grid>
            <Grid item>{`$${provider['averageTotalPayments']}`}</Grid>
            <Grid item>{`$${provider['averageMedicarePayments']}`}</Grid>
          </Grid>
        </CardContent>
      </Card>
    ));
  }, [providers]);

  return <Container className={classes.container}>{list}</Container>;
}
