require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

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
      webpack: config => {
        config.plugins = config.plugins || [];
        config.plugins = [
          ...config.plugins,
          new Dotenv({
            path: path.join(__dirname, '../.env'),
            systemvars: true,
          }),
        ];

        return config;
      },
    })
  )
);
