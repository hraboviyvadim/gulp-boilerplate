'use strict';
let webpack    = require('webpack');
let path       = require('path');
let util       = require('gulp-util');
let config     = require('./gulp/config');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const NODE_ENV = process.env.NODE_ENV || 'development';

const configs = {

  // sourcemaps for development version
  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  // entry points of out application
  entry: `${__dirname}/src/js/app.js`,
  output: {
    path: `${__dirname}/build/js`,
    filename: 'app.js',
    publicPath: '/build/'
  },

  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js']
  },

  resolveLoader: {
    extensions: ['.js']
  },

  // add necessary modules here
  module: {
    rules: [
      // this loader allow you to use ES6/7 syntax and JSX out of the box
      {
        test: /\.js$/,
        exclude: nodeModulesPath,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },

  // add necessary plugins here
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ]

};

module.exports = configs;
