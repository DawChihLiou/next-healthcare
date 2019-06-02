import { makeStyles } from '@material-ui/core/styles';

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

export default useStyles;
