import { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function ProviderList({ providers }) {
  const list = useMemo(
    () =>
      providers.map(provider => (
        <Card key={provider._id}>
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
      )),
    [providers]
  );

  return <Box>{list}</Box>;
}
