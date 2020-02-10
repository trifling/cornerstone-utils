const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  entry: {
    app: path.join(__dirname, '/dev/app.ts')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dev'),
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dev/index.html'
    }),
  ],
  module: {
    rules: [
      { test: /\.(dcm|png|svg|jpg|gif)$/, use: 'file-loader' },
    ]
  },
});
