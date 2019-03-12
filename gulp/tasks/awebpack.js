'use strict';
const gulp          = require('gulp');
const webpack       = require('webpack');
const gutil         = require('gulp-util');
const server        = require('./server');
const config        = require('../config');
let webpackConfig   = require('../../webpack.config');

function handler(err, stats, cb) {
  if (err) throw new gutil.PluginError('webpack', err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
    chunks: false
  }));
  server.reload();
  if (typeof cb === 'function') cb();
}

gulp.task('webpack', function(cb) {
  // modify some webpack config options
  webpackConfig.plugins = webpackConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        drop_console: true,
        unsafe: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
  //webpackConfig.entry = [`./build/js/app.js`, `./build/js/common.js`];

  // run webpack
  webpack(webpackConfig).run(function(err, stats) {
    handler(err, stats, cb);
  });
});

gulp.task('webpack:watch', function() {
  webpack(webpackConfig).watch({
    aggregateTimeout: 100,
    poll: false
  }, handler);
});