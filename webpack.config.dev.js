/* eslint-disable */
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

delete process.env.TS_NODE_PROJECT;

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    open: true,
    port: 3003,
    host: 'localhost',
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    plugins: [new TsconfigPathsPlugin({ baseUrl: 'src' })],
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [{ loader: 'svg-url-loader', options: { limit: 10000 } }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[name]__[local]--[hash:base64:5]' },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({ path: './.env.development' }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
