import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import LocationOnIcon from '@material-ui/icons/LocationOnOutlined';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    verticalAlign: 'text-bottom',
  },
  gridContainer: {
    marginTop: theme.spacing(1),
  },
}));

export default function ProviderList({ providers }) {
  const classes = useStyles();
  const list = useMemo(() => {
    if (!providers) {
      return null;
    }

    return providers.map(
      ({
        _id,
        providerId,
        providerName,
        providerCity,
        providerState,
        drgDefinition,
        providerZipCode,
        totalDischarges,
        averageTotalPayments,
        providerStreetAddress,
        averageCoveredCharges,
        averageMedicarePayments,
        hospitalReferralRegionDescription,
      }) => (
        <Card key={_id} className={classes.card}>
          <CardContent>
            {drgDefinition && (
              <Typography
                variant="body2"
                color="primary"
                gutterBottom
              >{`DGR: ${drgDefinition}`}</Typography>
            )}

            {providerName && (
              <Typography
                variant="h6"
                gutterBottom
              >{`${providerName}`}</Typography>
            )}

            <Typography variant="body2" component="p" gutterBottom>
              <LocationOnIcon className={classes.icon} />
              {`${providerStreetAddress || ''} ${providerCity ||
                ''}, ${providerState || ''} ${providerZipCode || ''}
            `}
            </Typography>

            <Grid container spacing={2} className={classes.gridContainer}>
              {providerId && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography variant="body2" color="textSecondary">
                    Privider ID
                  </Typography>
                  <Typography>{`${providerId}`}</Typography>
                </Grid>
              )}
              {hospitalReferralRegionDescription && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography variant="body2" color="textSecondary">
                    Hospital Referral Region Description
                  </Typography>
                  <Typography>{`${hospitalReferralRegionDescription}`}</Typography>
                </Grid>
              )}
              {totalDischarges && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography variant="body2" color="textSecondary">
                    Total Discharges
                  </Typography>
                  <Typography>{`$${totalDischarges.toFixed(2)}`}</Typography>
                </Grid>
              )}
              {averageCoveredCharges && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography variant="body2" color="textSecondary">
                    Average Covered Charges
                  </Typography>
                  <Typography>{`$${averageCoveredCharges.toFixed(
                    2
                  )}`}</Typography>
                </Grid>
              )}
              {averageTotalPayments && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography variant="body2" color="textSecondary">
                    Average Total Payments
                  </Typography>
                  <Typography>{`$${averageTotalPayments.toFixed(
                    2
                  )}`}</Typography>
                </Grid>
              )}
              {averageMedicarePayments && (
                <Grid item xs={6} sm={4} md={2}>
                  <Typography variant="body2" color="textSecondary">
                    Average Medicare Payments
                  </Typography>
                  <Typography>{`$${averageMedicarePayments.toFixed(
                    2
                  )}`}</Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )
    );
  }, [providers]);

  return <Container className={classes.container}>{list}</Container>;
}
