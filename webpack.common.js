const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin')
 
module.exports = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name]-[git-revision-version].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'CornerstoneUtils',
    // libraryTarget: 'commonjs2'
    // libraryTarget: 'browser'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: { loader: 'ts-loader' } },
      { test: /\.(html)$/, use: 'html-loader' },
      { test: /\.(fs|vs)$/, use: 'raw-loader' },
    ]
  },
  externals: {

  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ["node_modules"]
  },
  node: { fs: 'empty' },
  plugins: [
    new CleanWebpackPlugin({}),
    new GitRevisionPlugin({ branch: true }),
    new webpack.DefinePlugin({
      '_VERSION_': JSON.stringify((new GitRevisionPlugin).version()),
      '_COMMITHASH_': JSON.stringify((new GitRevisionPlugin).commithash()),
      '_BRANCH_': JSON.stringify((new GitRevisionPlugin).branch()),
    }),
  ]
};
