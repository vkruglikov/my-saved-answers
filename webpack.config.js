const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

require('dotenv').config();

const isProd = process.env.NODE_ENV == 'production';

module.exports = {
  mode: !isProd ? 'development' : 'production',
  devtool: !isProd ? 'source-map' : false,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: process.env.PUBLIC_PATH || '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    ...(process.env.DEV_HTTPS_HOST && {
      server: {
        type: 'https',
        options: {
          key: fs.readFileSync(path.resolve(process.env.DEV_PATH_KEY)),
          cert: fs.readFileSync(path.resolve(process.env.DEV_PATH_CERT)),
        },
      },
      host: process.env.DEV_HTTPS_HOST,
    }),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH),
      'process.env.TELEGRAM_BOT_NAME': JSON.stringify(
        process.env.TELEGRAM_BOT_NAME,
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
