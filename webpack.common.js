const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'CornerstoneUtils',
  },
  module: {
    rules: [
      { test: /\.ts$/, use: { loader: 'awesome-typescript-loader' } },
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
  ]
};
