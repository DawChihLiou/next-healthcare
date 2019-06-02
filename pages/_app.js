import Head from 'next/head';
import App, { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import MuiContainer from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import theme from '../src/theme';

export default class CustomApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Next Healthcare</title>
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MuiContainer maxWidth="lg">
            <Box height="100vh">
              <Component {...pageProps} />
            </Box>
          </MuiContainer>
        </ThemeProvider>
      </Container>
    );
  }
}
