const environment =
  process.env.DEPLOYCONTEXT ||
  process.env.BUILD_CONTEXT ||
  process.env.NODE_ENV ||
  'development';
const { parsed: currentEnv } = require('dotenv').config({
  path: `.env.${environment}`,
});
const { parsed: baseEnv } = require('dotenv').config({
  path: `.env.development`,
});
const webpack = require('webpack');
const withFonts = require('next-fonts');

const env = { ...baseEnv, ...currentEnv };

module.exports = withFonts({
  env,
  basePath: env.BASE_PATH,
  assetPrefix: env.ASSET_PREFIX,
  pageExtensions: ['mdx', 'jsx', 'ts', 'tsx'],
  webpack: (config, { dev }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(env));

    if (dev) {
      config.module.rules.push({
        test: /\.(js?x)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {},
      });
      config.module.rules.push({
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {},
      });
    }
    return config;
  },
});
