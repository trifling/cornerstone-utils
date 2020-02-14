import path from 'path';
import webpack from 'webpack';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
import packagejson from './package.json';

const configCallback = (env: {[key: string]: string}, argv: webpack.Configuration): webpack.Configuration => {

  // LIVE dev using webpack dev server -> bundle everything
  if (env && env.LIVE) {

    const config: webpack.Configuration = {
      mode: 'development',

      entry: {
        liveapp: path.join(__dirname, '/dev/app.ts'),
      },

      devtool: 'inline-source-map',

      devServer: {
        contentBase: path.resolve(__dirname, 'dev'),
        hot: true,
      },

      plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({ template: 'dev/index.html' }),
      ],

      module: {
        rules: [
          { test: /\.(dcm|png|svg|jpg|gif)$/, use: 'file-loader' },
          { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
        ],
      },

      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules'],
      },

      node: { fs: 'empty' }, // required because cornerstone-wado-image-loader imports it

    };

    return config;

  // Normal build
  } else {

    const mode = argv.mode || 'development';
    const config: webpack.Configuration = {
      mode,

      entry: { },

      output: {
        filename: mode === 'production' ? '[name].min.js' : '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: packagejson.name,
        umdNamedDefine: true,
      },

      devtool: mode === 'production' ? 'source-map' : 'inline-source-map',

      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules'],
      },

      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: [/node_modules/, /dev/]
          },
        ],
      },

      externals: [
        'cornerstone-core',
        'cornerstone-math',
        'cornerstone-tools',
        'cornerstone-wado-image-loader',
        'dicom-parser',
        'jszip',
        'rxjs',
      ],

      plugins: [
        new CleanWebpackPlugin({}),
      ],
    };

    // set default entry name
    (config.entry as any)[packagejson.name] = `./src/${packagejson.name}.ts`;

    return config;
  }
};

export default configCallback;
