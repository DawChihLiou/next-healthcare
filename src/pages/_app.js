import { useEffect } from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import theme from '../theme';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Next Healthcare</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh">
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </Container>
  );
}
