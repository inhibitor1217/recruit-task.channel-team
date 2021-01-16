const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  mode:
    process.env.NODE_ENV === 'production'
      ? 'production'
      : process.env.NODE_ENV === 'development' && 'development',
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'src/index.tsx')],
  output: {
    path:
      process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, 'build')
        : undefined,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    hot: true,
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'public'),
  },
};
