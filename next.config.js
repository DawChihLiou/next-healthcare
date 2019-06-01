const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withCSS(
    withSass({
      target: 'serverless',
      cssLoaderOptions: {
        url: false,
      },
    })
  )
);
