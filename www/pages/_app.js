import Head from 'next/head';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { ThemeProvider } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import configureStore from '../src/store';
import { checkUserInCookies } from '../src/store/actions';

import theme from '../src/theme';

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    const { store } = this.props;

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    store.dispatch(checkUserInCookies());
  }

  componentDidUpdate() {
    const { store } = this.props;
    store.dispatch(checkUserInCookies());
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>Next Healthcare</title>
        </Head>

        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box height="100vh">
              <Component {...pageProps} />
            </Box>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

const enhanced = withRedux(configureStore);

export default enhanced(CustomApp);
