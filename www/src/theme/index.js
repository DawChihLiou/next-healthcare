import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

export default theme;
