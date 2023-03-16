/* eslint-disable */
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

delete process.env.TS_NODE_PROJECT;

module.exports = {
  entry: './src/index',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    plugins: [new TsconfigPathsPlugin({ baseUrl: 'src' })],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: { fullySpecified: false },
      },
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
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({ path: './.env' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/manifest.json',
          to: path.resolve(__dirname, './docs'),
        },
        {
          from: './public/favicon.ico',
          to: path.resolve(__dirname, './docs'),
        },
        // { from: './src/images', to: './dist/images' },
      ],
    }),
  ],
};
